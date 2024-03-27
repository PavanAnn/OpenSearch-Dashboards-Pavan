/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import '../../index.scss';
import moment from 'moment';
import { EuiToolTip } from '@elastic/eui';
import { CoreStart, AppMountParameters } from '../../../../../core/public';
import { NavigationPublicPluginStart } from '../../../../navigation/public';
import { IconSVG } from '../Components/Assets/Loading';
import { Filter } from '../filter';
import { StreamingContext } from '../../context/streaming/context';
import {
  BtnDataStreaming,
  ContainerStreaming,
  Cards,
  CardsContainer,
  CardsTitle,
  CardsSwitch,
  StatusDiv,
  StatusContainer,
  DetailInfo,
  DetailsContainer,
  DetailTitle,
  EditDeleteContainer,
  WrapperTitle,
  FilterContainer,
  NoResult,
  BtnCancel,
  Button
} from '../../styles/styles';
import { EditIcon } from '../Components/Assets/EditIcon';
import { DeleteIcon } from '../Components/Assets/DeleteIcon';
import { InfoIcon } from '../Components/Assets/InfoIcon';
import { CardType } from '../../types/Streaming';

import { Modal } from '../modals/modal.active';

import { useWindowDimensions } from './useWindowSize';
interface ListProps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart['chrome'];
  history: AppMountParameters['history'];
}

export const List = ({ basename, notifications, application, chrome, history }: ListProps) => {
  const [active, setActive] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState<object>({});
  React.useEffect(() => {
    chrome.setBreadcrumbs([
      {
        text:'Data Streaming'
        // href: '/app/data-streaming',
      },
    ]);
  }, [history.location])

  const {
    card,
    total,
    handleUpdate,
    setCard,
    policies,
    isLoading,
    checkTotalStreaming,
    handleDelete,
    handleSearchClean
  } = useContext(StreamingContext);

  const updateDataStreaming = async (item: any) => {
    const newCard: CardType[] = [];

    card.forEach((value, index) => {
      if (item._id === value._id) {
        card[index].enabled = !card[index].enabled;
        newCard.push(card[index]);
      } else {
        newCard.push(value);
      }
    });

    const update = await handleUpdate(item, item.enabled);

    if (update != 200 && update != 204) {
      notifications.toasts.addDanger(
        'There was a problem with the request. Contact your system administrator'
      );
    } else {
      setCard(newCard);
      if (item.enabled) notifications.toasts.addSuccess('Delivery Stream activated successfully');
      else notifications.toasts.addSuccess('Delivery Stream deactivated successfully');
    }
  };

  const { width } = useWindowDimensions();

  const [widthSidebar, setWidthSidebar] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setWidthSidebar(true);
    } else {
      setWidthSidebar(false);
    }
  }, [width]);

  useEffect(() => {
    checkTotalStreaming();
    document.title = 'Data Streaming - Sensedia Analytics';
  }, []);

  if (isLoading) {
    return (
      <Router basename={basename}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}>
          <IconSVG />
        </div>
      </Router>
    );
  }

  if (total === 0) {
    if(policies.includes('analytics.data-streaming.create')){
      return (
        <ContainerStreaming>
          <h1>{'You don’t have any data streaming configured yet!'}</h1>
          {/* <Link to={{ ...location, pathname: `/create-a-delivery-stream` }}> */}
          <BtnDataStreaming onClick={() => history.push('/create-a-delivery-stream')}>
            {'create your first delivery stream'}
          </BtnDataStreaming>
          {/* </Link> */}
        </ContainerStreaming>
      );
    }else{
      return (
        <ContainerStreaming>
          <h1>{'You don’t have any data streaming configured yet!'}</h1>
          {/* <Link to={{ ...location, pathname: `/create-a-delivery-stream` }}> */}
          <BtnDataStreaming disabled={true}>
            {'create your first delivery stream'}
          </BtnDataStreaming>
          {/* </Link> */}
        </ContainerStreaming>
      );
    }

  }

  if (!card.length) {
    return (
      <>
        <Filter notifications={notifications} application={application} />
        <FilterContainer>
          <NoResult>No results found</NoResult>
        </FilterContainer>
      </>
    );
  }

  const setData = (_id: any, exporter: string, stream_name: string, config: string) => {
    localStorage.setItem('_id', _id);
    localStorage.setItem('exporter', exporter);
    localStorage.setItem('stream_name', stream_name);
    localStorage.setItem('config', config);
  };

  function natural(num: number, div: number) {
    if (num == 0) {
      return num;
    }
    else {
      return Number(num / div).toFixed(2)
    }
  }

  const callHandleDelete = async (item: any) => {

    setActive(false);
    const response =await handleDelete(item);

    if(response == '204'){
      notifications.toasts.addSuccess('Delivery Stream deleted successfully')
      checkTotalStreaming()
    }else{
      notifications.toasts.addDanger('There was a problem with the request. Contact your system administrator.')

    }

    setDeleteData({});
  }

  return (
    <>
      <Filter notifications={notifications} application={application} />
      <CardsContainer style={{ justifyContent: widthSidebar ? 'center' : '' }}>
        {card
          .sort((a, b) => a.stream_name.localeCompare(b.stream_name))
          .sort(function (x, y) {
            return x.enabled === y.enabled ? 0 : x.enabled ? -1 : 1;
          })
          ?.map((item: any, index: number) => (
            <Cards key={index}>
              <EuiToolTip position="top" content={item.stream_name}>
                <CardsTitle>
                  {item.stream_name.length > 24
                    ? item.stream_name.substring(0, 24) + ' ...'
                    : item.stream_name}
                </CardsTitle>
              </EuiToolTip>
              <StatusContainer>
                <CardsSwitch
                  showLabel={false}
                  label="Autoscaling"
                  value={item.index}
                  checked={item.enabled}
                  onChange={() => updateDataStreaming(item)}
                  compressed
                  disabled={
                      policies.includes('analytics.data-streaming.update')
                      ? false
                      : true
                  }
                />
                <StatusDiv active={item.enabled}>
                  {item.enabled === false ? 'INACTIVE' : 'ACTIVE'}
                </StatusDiv>
              </StatusContainer>
              <div style={{ width: '100%', border: '1px sol_id #c4c4c4', margin: '24px 0px' }} />
              <DetailsContainer>
                <div>
                  <WrapperTitle>
                    <DetailTitle>Destination </DetailTitle>
                    <EuiToolTip position="bottom" content="Delivery stream destination">
                      <InfoIcon />
                    </EuiToolTip>
                  </WrapperTitle>

                  <DetailInfo>{item.exporter}</DetailInfo>
                </div>
                <div>
                  <WrapperTitle>
                    <DetailTitle>Data Transfer</DetailTitle>
                    <EuiToolTip
                      position="bottom"
                      content="Amount of data transferred in the last 30 days"
                    >
                      <InfoIcon />
                    </EuiToolTip>
                  </WrapperTitle>

                  <DetailInfo>{
                    item.data_transfer < 1024 ? natural(item.data_transfer, 1) + ' B' :
                      item.data_transfer < 1048576 ? natural(item.data_transfer, 1024) + ' KB' :
                        item.data_transfer < 1073741824 ? natural(item.data_transfer, 1048576) + ' MB' :
                          item.data_transfer < 1099511627776 ? natural(item.data_transfer, 1073741824) + ' GB' :
                            natural(item.data_transfer, 1099511627776) + ' TB'
                  }</DetailInfo>
                </div>
                <div>
                  <WrapperTitle>
                    <DetailTitle>Creation Date</DetailTitle>
                    <EuiToolTip position="bottom" content="Delivery stream creation date">
                      <InfoIcon />
                    </EuiToolTip>
                  </WrapperTitle>
                  <DetailInfo style={{ width: '48%' }}>
                    {moment.unix(item.created_at).format('DD/MM/YYYY h:mm:ss a')}
                  </DetailInfo>
                </div>
              </DetailsContainer>
              <div style={{ width: '100%', border: '1px sol_id #c4c4c4', marginBottom: '24px' }} />
              <EditDeleteContainer>
                {policies.includes('analytics.data-streaming.update') && (
                  <Link to={{ ...location, pathname: `/edit-delivery-stream/${item._id}` }}>
                    <button onClick={() => { setData(item._id, item.exporter, item.stream_name, item.config); }}>
                      <EditIcon />
                    </button>
                  </Link>
                )}
                {policies.includes('analytics.data-streaming.delete') && (
                  <>
                    <button onClick={() => { setActive(true);setDeleteData(item) }}>
                      <DeleteIcon />
                    </button>

                  </>

                )}



              </EditDeleteContainer>

            </Cards>
          ))}
          <Modal
                width={396}
                active={active}
                hideModal={() => setActive(false)}
                title="delete delivery stream"
                footer={
                  <>
                    <BtnCancel onClick={() => setActive(false)}>{'CANCEL'}</BtnCancel>
                    <Button type="submit" onClick={() => callHandleDelete(deleteData)}>
                      {'CONFIRM'}
                    </Button>
                  </>
                }
              >
                {/* @ts-ignore */}
                <p>{`${deleteData?.stream_name} will be permanently deleted.`}</p>
                <p>{'This action cannot be undone and may take several minutes'}</p>
                <p>{'Do you want to continue?'}</p>
              </Modal>
      </CardsContainer>
    </>
  );
};
