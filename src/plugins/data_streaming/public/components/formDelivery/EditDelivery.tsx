import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiFieldPassword, EuiToolTip } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppMountParameters, CoreStart, ChromeStart } from '../../../../../core/public';
import { NavigationPublicPluginStart } from '../../../../navigation/public';
import { InfoIcon } from '../assets/infoIcon';
import { Modal } from '../modals/modal.active';
import { Button } from '../modals/modal.styles';
import HttpRequest, { currentUser } from '../../../../../Interceptors/HttpRequest';
import {
  ContainerDelivery,
  Content,
  BtnCancel,
  BtnSave,
  BottomSubmit,
  BtnSaveInactive,
  Label,
  TextField,
  Select,
} from './styles';
import { removeEmptyString } from './util';


interface FormProps {
  config: { site: string; key: string, aws_secret: string, aws_bucket_name: string, aws_key: string, aws_region: string };
}

interface ListProps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart["chrome"];

}

function setBreadcrumbs(chrome: ChromeStart) {
  chrome.setBreadcrumbs([
    {
      text: 'Data Streaming',
      href: '/app/data-streaming',
    },
    {
      text: 'Edit Delivery Stream'
    },
  ]);
}
const optionsDatadog = [
  {text:'Choose your site', value: '', hidden: true},
  {text:'US1', value: 'datadoghq.com'},
  {text:'US3', value: 'us3.datadoghq.com'},
  {text:'US5', value: 'us5.datadoghq.com'},
  {text:'EU1', value: 'datadoghq.eu'},
  {text:'US1-FED', value: 'ddog-gov.com'},
]
const regions = [
  { value: '', text: 'Choose your region', hidden: true },
  { value: 'us-east-2', text: 'US-EAST-2' },
  { value: 'us-east-1', text: 'US-EAST-1' },
  { value: 'us-west-1', text: 'US-WEST-1' },
  { value: 'us-west-2', text: 'US-WEST-2' },
  { value: 'af-south-1', text: 'AF-SOUTH-1' },
  { value: 'ap-east-1', text: 'AP-EAST-1' },
  { value: 'ap-south-2', text: 'AP-SOUTH-2' },
  { value: 'ap-southeast-3', text: 'AP-SOUTHEAST-3' },
  { value: 'ap-south-1', text: 'AP-SOUTH-1' },
  { value: 'ap-northeast-3', text: 'AP-NORTHEAST-3' },
  { value: 'ap-northeast-2', text: 'AP-NORTHEAST-2' },
  { value: 'ap-southeast-1', text: 'AP-SOUTHEAST-1' },
  { value: 'ap-southeast-2', text: 'AP-SOUTHEAST-2' },
  { value: 'ap-northeast-1', text: 'AP-NORTHEAST-1' },
  { value: 'ca-central-1', text: 'CA-CENTRAL-1' },
  { value: 'eu-central-1', text: 'EU-CENTRAL-1' },
  { value: 'eu-west-1', text: 'EU-WEST-1' },
  { value: 'eu-west-2', text: 'EU-WEST-2' },
  { value: 'eu-south-1', text: 'EU-SOUTH-1' },
  { value: 'eu-west-3', text: 'EU-WEST-3' },
  { value: 'eu-south-2', text: 'EU-SOUTH-2' },
  { value: 'eu-north-1', text: 'EU-NORTH-1' },
  { value: 'eu-central-2', text: 'EU-CENTRAL-2' },
  { value: 'me-south-1', text: 'ME-SOUTH-1' },
  { value: 'me-central-1', text: 'ME-CENTRAL-1' },
  { value: 'sa-east-1', text: 'SA-EAST-1' }
]

export const EditDelivery = ({ basename, application, navigation, chrome, notifications }: ListProps) => {
  setBreadcrumbs(chrome)

  const history = useHistory();
  const [dual] = useState(true);
  const [active, setActive] = useState(false);
  const [exporter, setExporter] = useState('');
  const [stream_name, setStreamName] = useState('');

  const [config, setConfig] = useState<FormProps>({
    config: { site: '', key: '', aws_key: '', aws_secret: '', aws_bucket_name: '', aws_region: '' },
  } as FormProps);

  const [_id, setId] = useState<string | null>();

  useEffect(() => {
    setExporter(localStorage.getItem('exporter') || '');
    setStreamName(localStorage.getItem('stream_name') || '');
    const showList = JSON.parse(localStorage.getItem('config') || '');
    setConfig({ config: { site: showList.site, key: showList.key, aws_key: showList.aws_key, aws_secret: showList.aws_secret, aws_bucket_name: showList.aws_bucket_name, aws_region: showList.aws_region } });
    setId(localStorage.getItem('_id'));

  }, []);

  const preventDefault = (e: any) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {

    let data = removeEmptyString(config)
    await HttpRequest.put(`/analytics/v1/data-streaming/${_id}`, {
      _id,
      exporter,
      stream_name,
      enabled: true,
      config: JSON.stringify(data.config),
    })
      .then((resp) => {

        const { response }:any = resp;

        if(response?.data?.errors){
          notifications.toasts.addDanger(response.data.errors[0].message)
          setActive(false)
        }else{
          history.push('/');
          application.navigateToApp('data-streaming');
        }


      })
      .catch((err) => {
        notifications.toasts.addDanger(err.data.errors[0].message)
      });
  };

  const colorDisabled = exporter !== '' ? 'disabledColor' : 'availableColor';

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });

  };

  return (
    <ContainerDelivery>
      <Content>
        <form onSubmit={preventDefault}>
          <EuiFlexGroup>
            <EuiFlexItem>

              <Label
                label="Destination"
                className={colorDisabled}
                labelAppend={
                  <EuiToolTip position="right" content="Choose a destination for your data">
                    <InfoIcon />
                  </EuiToolTip>
                }
              >
                <TextField
                  name="exporter"
                  value={exporter}
                  onChange={(e) => setExporter(e.target.value)}
                  disabled={true}
                />
              </Label>
            </EuiFlexItem>
            <EuiFlexItem>
              <Label className={colorDisabled} label="Delivery stream name">
                <TextField
                  name="stream_name"
                  value={stream_name}
                  onChange={(e) => setStreamName(e.target.value)}
                  placeholder="Stream name"
                  disabled={true}
                />
              </Label>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer />
          {
            exporter === "s3" &&
            <>
              <EuiFlexGroup>
                <EuiFlexItem>

                  <Label
                    label="AWS Region"
                    labelAppend={
                      <>
                        <strong>*</strong>
                        <EuiToolTip position="right" content="Region where your AWS S3 is hosted">
                          <InfoIcon />
                        </EuiToolTip>
                      </>
                    }
                  >
                    <Select
                      name="region"
                      value={config?.config.aws_region}
                      options={regions}
                      onChange={(e) => {
                        handleChange(e);
                        setConfig({ ...config, config: { ...config.config, aws_region: e.target.value } })
                      }}
                    />
                  </Label>
                </EuiFlexItem>
                <EuiFlexItem>

                  <Label
                    label="Bucket name"
                    labelAppend={
                      <>
                        <strong>*</strong>
                        <EuiToolTip position="right" content="Name of your bucket in AWS S3">
                          <InfoIcon />
                        </EuiToolTip>
                      </>}
                  >
                    <TextField
                      name="config.bucket"
                      value={config?.config.aws_bucket_name}
                      onChange={(e) =>
                        setConfig({ ...config, config: { ...config.config, aws_bucket_name: e.target.value } })
                      }
                      placeholder="Bucket name"
                      maxLength={100}
                      fullWidth={true}
                    />
                  </Label>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <Label
                    label="Key"
                    labelAppend={
                      <>
                        <strong>*</strong>
                        <EuiToolTip position="right" content="Enter the key related to your resource">
                          <InfoIcon />
                        </EuiToolTip>
                      </>
                    }
                  >
                    <TextField
                      name="config.aws_key"
                      value={config?.config.aws_key}
                      onChange={(e) =>
                        setConfig({ ...config, config: { ...config.config, aws_key: e.target.value } })
                      }
                      placeholder="Key"
                      maxLength={250}
                    />
                  </Label>
                </EuiFlexItem>
                <EuiFlexItem>
                  <Label
                    label="Secret"
                    className="pass-field"
                    labelAppend={
                      <>
                        <strong>*</strong>
                        <EuiToolTip position="right" content="Enter the secret associated to your key">
                          <InfoIcon />
                        </EuiToolTip>
                      </>
                    }
                  >
                    <EuiFieldPassword
                      name="config.secret"
                      value={config?.config.aws_secret}
                      onChange={(e) =>
                        setConfig({ ...config, config: { ...config.config, aws_secret: e.target.value } })
                      }
                      placeholder="Secret"
                      type={dual ? 'dual' : undefined}
                      maxLength={100}
                    />
                  </Label>

                </EuiFlexItem>
              </EuiFlexGroup>
            </>
          }
          {
            exporter === 'datadog' &&
            <EuiFlexGroup>
              <EuiFlexItem>
                <Label
                  label="Datadog site"
                  labelAppend={
                    <>
                      <strong>*</strong>
                      <EuiToolTip position="right" content="Site where your datadog is hosted">
                        <InfoIcon />
                      </EuiToolTip>
                    </>
                  }
                >
                  <Select
                    name="config.site"
                    value={config?.config.site}
                    options={optionsDatadog}
                    onChange={(e) => {
                      handleChange(e);
                      setConfig({ ...config, config: { ...config.config, site: e.target.value } })
                    }}
                  />
                </Label>
              </EuiFlexItem>
              <EuiFlexItem>
                <Label
                  label="API key"
                  className="pass-field"
                  labelAppend={
                    <>
                      <strong>*</strong>
                      <InfoIcon />
                    </>
                  }
                >
                  <EuiFieldPassword
                    name="config.key"
                    value={config?.config.key}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        config: { ...config.config, key: e.target.value },
                      })
                    }
                    placeholder="API key"
                    type={dual ? 'dual' : undefined}
                    maxLength={100}
                  />
                </Label>
              </EuiFlexItem>
            </EuiFlexGroup>
          }


          <EuiSpacer />

          <BottomSubmit>
            <Link to={{ ...location, pathname: '/' }}>
              <BtnCancel onClick={() => application.navigateToApp('data-streaming')}>
                {'CANCEL'}
              </BtnCancel>
            </Link>
            {(config?.config.site && config?.config.key) !== '' ? (
              <BtnSave onClick={() => setActive(true)}>{'SAVE'}</BtnSave>
            ) : (
              <BtnSaveInactive disabled>{'SAVE'}</BtnSaveInactive>
            )}
          </BottomSubmit>
          <Modal
            width={396}
            active={active}
            hideModal={() => setActive(false)}
            title="activate delivery stream"
            footer={
              <>
                <BtnCancel onClick={() => setActive(false)}>{'CANCEL'}</BtnCancel>
                <Button type="submit" onClick={handleSubmit}>
                  {'ACTIVE'}
                </Button>
              </>
            }
          >
            <p>{'You are about to activate this delivery stream.'}</p>
            <p>{'Do you want to continue?'}</p>
          </Modal>
        </form>
      </Content>
    </ContainerDelivery>
  );
};
