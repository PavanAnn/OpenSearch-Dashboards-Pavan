import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { EuiButtonIcon, EuiCodeBlock, EuiInMemoryTable, EuiText, EuiToolTip } from '@elastic/eui';
import { FormProps, TableProps } from '../../../types';
import { Modal } from '../../modals/modal.active';
import { Badge } from '../badgeStatus';
import { ModalContent, HeaderLog, HeaderContent } from '../sectionTable.styles';
import { findObjects } from '../../../utils';
import { RootState } from '../../store/store';
import { getLogs, setPagination, setSearchClicked } from '../../store/states';
import ExternalLinkIcon from '../../assets/externalLinkIcon';

const MainTable = () => {
  const dispatch = useDispatch();
  const { formResult, formFilter, pagination, searchClicked, initializedFromURL } = useSelector(
    (state: RootState) => state.logReducer
  );
  const [active, setActive] = useState(false);
  const [logData, setLogData] = useState<TableProps>({
    severity_text: '',
    severity_number: '',
    timestamp: '',
    resource_attributes: {
      'sensedia.product.name': '',
    },
    service_name: '',
  });

  const handleIdClick = (item: TableProps) => setLogData(item);

  function limitText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const TimestampColumn = ({ value }) => (
    <EuiText color="subdued" style={{ fontStyle: 'normal' }}>
      {moment(value).format('DD/MM/YYYY hh:mm:ss A')}
    </EuiText>
  );

  const ServiceNameColumn = ({ serviceName }) => (
    <EuiText color="subdued" style={{ fontStyle: 'normal' }}>
      {serviceName}
    </EuiText>
  );

  const BodyColumn = ({ body, trace_id, resource_attributes, setActive }) => (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <EuiText
        color="subdued"
        className="bodyColumn"
        style={{ fontStyle: 'normal' }}
        onClick={() => setActive(true)}
      >
        {limitText(body, 90)}
      </EuiText>
      <EuiToolTip position="top" content="Go to trace">
      <button
        style={{ cursor: trace_id == null ? 'not-allowed' : 'pointer' }}
        disabled={trace_id == null}
        onClick={() =>
          window.open(
            `${
              window.location.origin
            }/analytics/app/traces?trace_id=${trace_id}&sensedia.product.name=${findObjects(
              resource_attributes,
              'sensedia.product.name'
            )}`
          )
        }
      >
        <ExternalLinkIcon color={trace_id ? '#837FF6' : '#C0C0C0'} />
      </button>
      </EuiToolTip>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        field: 'severity_text',
        name: 'LEVEL',
        sortable: true,
        truncateText: true,
        render: (status: string, item: TableProps) => (
          <Badge
            key={status || item.severity_number}
            text={status || String(item.severity_number)}
            level={status || item.severity_number}
          />
        ),
        width: '10%',
        mobileOptions: {
          header: false,
          enlarge: true,
          truncateText: false,
        },
      },
      {
        field: 'timestamp',
        name: 'TIMESTAMP',
        sortable: true,
        truncateText: true,
        width: '20%',
        mobileOptions: {
          header: false,
          enlarge: true,
          truncateText: false,
        },
        render: (value: moment.MomentInput) => <TimestampColumn value={value} />,
      },
      {
        field: 'resource_attributes',
        name: 'PRODUCT',
        sortable: true,
        truncateText: true,
        width: '10%',
        mobileOptions: {
          header: false,
          enlarge: true,
          truncateText: false,
        },
        render: (resourceAttributes: FormProps) => (
          <EuiText color="subdued" style={{ fontStyle: 'normal' }}>
            {findObjects(resourceAttributes, 'sensedia.product.name')}
          </EuiText>
        ),
      },
      {
        field: 'service_name',
        name: 'SERVICE NAME',
        truncateText: true,
        sortable: true,
        width: '10%',
        mobileOptions: {
          header: false,
          enlarge: true,
          truncateText: false,
        },
        render: (serviceName: FormProps) => <ServiceNameColumn serviceName={serviceName} />,
      },
      {
        field: 'body',
        name: 'BODY',
        width: '50%',
        mobileOptions: {
          header: false,
          enlarge: true,
          truncateText: false,
        },
        truncateText: true,
        render: (body: FormProps, { trace_id, resource_attributes }: FormProps) => (
          <BodyColumn
            body={body}
            resource_attributes={resource_attributes}
            trace_id={trace_id}
            setActive={setActive}
          />
        ),
      },
    ],
    []
  );

  const rowProps = (item: any) => ({
    onClick: () => handleIdClick(item),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search) as any;
    const pageParam = params.get('page');
    const parsedPage = parseInt(pageParam, 10);

    if (!isNaN(parsedPage)) {
      dispatch(setPagination({ ...pagination, page: parsedPage }));
      dispatch(getLogs({ formFilter, pagination: { ...pagination, page: parsedPage } }));
    }

    if (searchClicked && formFilter.start_timestamp && formFilter.end_timestamp) {
      dispatch(getLogs({ formFilter, pagination }));
      dispatch(setSearchClicked(false));
    } else {
      if (initializedFromURL) {
        if (formFilter.start_timestamp && formFilter.end_timestamp) {
          dispatch(getLogs({ formFilter, pagination }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchClicked, initializedFromURL]);

  return (
    <>
      <div className="main_table">
        <EuiInMemoryTable items={formResult} columns={columns} sorting={true} rowProps={rowProps} />
      </div>
      <Modal
        width={500}
        active={active}
        hideModal={() => setActive(false)}
        title={''}
        footer={undefined}
      >
        <ModalContent>
          <HeaderLog>
            <HeaderContent>
              <div className="data-log">LEVEL: </div>
              <Badge
                text={logData.severity_text || logData.severity_number}
                level={logData.severity_text || logData.severity_number}
              />

              <div className="data-log">TIMESTAMP: </div>
              <b>{moment(logData.timestamp).format('DD/MM/YYYY hh:mm:ss A')}</b>

              <div className="data-log">PRODUCT: </div>
              <b>{findObjects(logData.resource_attributes, 'sensedia.product.name')}</b>

              <div className="data-log">SERVICE NAME: </div>
              <b>{logData?.service_name}</b>
              {logData.trace_id && (
                <>
                  <div className="data-log">TRACE ID: </div>
                  <b>{logData.trace_id}</b>
                </>
              )}
            </HeaderContent>

            <EuiButtonIcon
              className="close-button-modal"
              iconType="cross"
              onClick={() => setActive(false)}
              aria-label="close modal"
            />
          </HeaderLog>
          <EuiCodeBlock
            className="custom-width-code"
            language="json"
            overflowHeight={300}
            isCopyable
            style={{ overflowY: 'auto' }}
          >
            {JSON.stringify(logData?.body)}
          </EuiCodeBlock>
        </ModalContent>
      </Modal>
    </>
  );
};

export { MainTable };
