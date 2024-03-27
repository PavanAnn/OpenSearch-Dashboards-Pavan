//@ts-nocheck
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiFieldPassword, EuiToolTip } from '@elastic/eui';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from '../../../../../Interceptors/HttpRequest';
import { InfoIcon } from '../assets/infoIcon';
import { Modal } from '../modals/modal.active';
import { Button } from '../modals/modal.styles';
import { ChromeStart,CoreStart } from '../../../../../core/public';
import { NavigationPublicPluginStart } from '../../../../navigation/public';
import '../../index.scss';

import {
  ContainerDelivery,
  Content,
  BtnCancel,
  BtnSave,
  BottomSubmit,
  BtnSaveInactive,
  Select,
  Label,
  TextField,
  ErrorMessage,
} from './styles';
import { removeEmptyString } from './util';
import { i18n } from '@osd/i18n';

interface FormPros {
  exporter: string;
  stream_name: string;
  config: { site: string; key: string, aws_bucket_name: string, aws_key: string, aws_secret: string, aws_region: string };

}

function setBreadcrumbs(chrome: ChromeStart) {
  chrome.setBreadcrumbs([
    {
      text: i18n.translate('devTools.k7BreadcrumbsDevToolsLabel', {
        defaultMessage: 'Data Streaming',
      }),
      href: '/app/data-streaming',
    },
    {
      text: i18n.translate('devTools.k7BreadcrumbsDevToolsLabel', {
        defaultMessage: 'Create a Delivery Stream',
      }),
    },
  ]);
}

interface ListProps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart["chrome"];
}

export const FormDelivery = ({ basename, application, navigation,chrome, notifications }: ListProps) => {

  setBreadcrumbs(chrome)
  const history = useHistory();
  const [dual] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  const options = [
    { value: '', text: 'Choose your destination', hidden: true },
    { value: 'datadog', text: 'Datadog' },
    { value: 's3', text: 'AWS S3' },
  ];

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

  const [form, setForm] = useState<FormPros>({
    exporter: '',
    stream_name: '',
    config: { site: '', key: '', aws_bucket_name: '', aws_key: '', aws_secret: '',aws_region:'' }
  } as FormPros);
  const [exporter, setExporter] = useState(options[0].value);

  const [streamName] = useState('');

  const alphaNumericValue = (e: any) => {
    const { value } = e.target;
    const regex = /^[a-z0-9]+$/i;
    const matchField = !value.match(regex);
    if (matchField && value !== '') {
      setError('O campo deve conter apenas valores alfanuméricos.');
    } else {
      setError('');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

  };

  const preventDefault = (e: any) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {

    let data = removeEmptyString(form)

    await Axios.post(`/analytics/v1/data-streaming`, {
      ...data,
      config: JSON.stringify(data.config),
    })
      .then( (resp) => {
        const { response }:any = resp;

        if(response?.data?.errors){
          notifications.toasts.addDanger(response.data.errors[0].message)
          setActive(false)
        }else{
          history.push('/');
        }

      })
      .catch((error) => {
        notifications.toasts.addDanger(error.data.errors[0].message)
      });

  };

  const colorDisabled = exporter === '' ? 'disabledColor' : 'availableColor';

  return (
    <>
      <ContainerDelivery>
        <Content>
          <form onSubmit={preventDefault}>
            <EuiFlexGroup>
              <EuiFlexItem>

                <Label
                  label="Destination"
                  labelAppend={
                    <>
                      <strong>*</strong>
                      <EuiToolTip position="right" content="Choose a destination for your data">
                        <InfoIcon />
                        </EuiToolTip>
                    </>
                  }
                >
                  <Select
                    name="exporter"
                    value={exporter}
                    options={options}
                    onChange={(e) => {
                      handleChange(e);
                      setExporter(e.target.value);
                    }}
                  />
                </Label>

              </EuiFlexItem>
              <EuiFlexItem>
                <Label
                  className={colorDisabled}
                  label="Delivery stream name"
                  labelAppend={ <>
                      <strong>*</strong>
                      <div style={{visibility:'hidden'}}>
                      <EuiToolTip position="right" content="">
                        <InfoIcon />
                        </EuiToolTip>
                      </div>
                    </>}
                >
                  <TextField
                    name="stream_name"
                    defaultValue={streamName}
                    onChange={handleChange}
                    onBlur={alphaNumericValue}
                    placeholder="Stream name"
                    maxLength={33}
                    disabled={exporter === ''}
                  />
                </Label>
                {exporter !== '' ? error && <ErrorMessage>{error}</ErrorMessage> : ''}
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
                        value={form.config.aws_region}
                        options={regions}
                        onChange={(e) => {
                          handleChange(e);
                          setForm({...form, config:{...form.config, aws_region: e.target.value}})
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
                        value={form?.config.aws_bucket_name}
                        onChange={(e) =>
                          setForm({ ...form, config: { ...form.config, aws_bucket_name: e.target.value } })
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
                        value={form?.config.aws_key}
                        onChange={(e) =>
                          setForm({ ...form, config: { ...form.config, aws_key: e.target.value } })
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
                        value={form?.config.aws_secret}
                        onChange={(e) =>
                          setForm({ ...form, config: { ...form.config, aws_secret: e.target.value } })
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

            {exporter === 'datadog' ? (
              <EuiFlexGroup>
                <EuiFlexItem>
                <Label
                      label="Site"
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
                    value={form?.config.site}
                    options={optionsDatadog}
                    onChange={(e) => {
                      handleChange(e);
                      setForm({ ...form, config: { ...form.config, site: e.target.value } })
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
                        <EuiToolTip
                          position="bottom"
                          content="Enter the API Key for your Datadog destination"
                        >
                          <InfoIcon />
                        </EuiToolTip>
                      </>
                    }
                  >
                    <EuiFieldPassword
                      name="config.key"
                      value={form?.config.key}
                      onChange={(e) =>
                        setForm({ ...form, config: { ...form.config, key: e.target.value } })
                      }
                      placeholder="API key"
                      type={dual ? 'dual' : undefined}
                      maxLength={100}
                    />
                  </Label>
                </EuiFlexItem>
              </EuiFlexGroup>
            ) : (
              ''
            )}
            <EuiSpacer />

            <BottomSubmit>
              <BtnCancel onClick={() => history.goBack()}>{'CANCEL'}</BtnCancel>
              {
              (form.exporter  && form.stream_name ) !== '' &&
              (form.exporter == "datadog" && form.stream_name && form.config.site && form.config.key) !== ''
                &&
              (form.exporter == "s3" && form.config.aws_bucket_name  && form.config.aws_region  && form.config.aws_key  && form.config.aws_secret ) !== ''
              ? (
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
    </>
  );
};


