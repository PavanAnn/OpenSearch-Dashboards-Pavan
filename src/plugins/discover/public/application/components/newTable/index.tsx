//@ts-nocheck
import React, { useState, Fragment, useEffect } from 'react';
import {
  // formatDate,
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiButton,
  EuiDescriptionList,
  EuiScreenReaderOnly,
  RIGHT_ALIGNMENT,
  LEFT_ALIGNMENT,
  EuiCodeBlock,
  EuiLoadingChart,
  EuiToolTip,
} from '@elastic/eui';
import moment from 'moment';
import { parentTree } from '../MetricGraph/util';
import Axios from '../../../../../../Interceptors/HttpRequest';
import { DocViewRenderProps } from '../../doc_views/doc_views_types';
import { getServices } from '../../../opensearch_dashboards_services';
import { useWindowDimensions } from './hooks/useWindowSize';

export const NewTable = ({ hit }: DocViewRenderProps) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<any>({});
  const [yaxis, setYaxis] = React.useState([]);

  const [max, setMax] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState(false);
  const { toastNotifications } = getServices();
  const [maxWidht, setMaxWidht] = React.useState(0);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setMaxWidht(width);
  }, [width]);

  React.useEffect(() => {
    const loadTrace = async () => {
      setIsLoading(true);
      setError(false);
      setIsLoading(true);

      let product = await currentProductName(hit);

      Axios.get(
        `/analytics/v1/products/${product.sensedia.product.name}/traces/${hit._source.trace_id}`
      )
        .then(({ data }) => {
          if (data) {
            parentTree(data).then((resp) => {
              // resp.y.sort(function (a: any, b: any) { return a.start_time_unix_nano - b.start_time_unix_nano })
              setYaxis(resp.y);
              setMax(resp.max);
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setError(true);
          }
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
        });
    };

    loadTrace();
  }, []);

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { field: sortField, direction: sortDirection }: any = sort;
    if (sortDirection == 'asc') {
      yaxis.sort(function (a: any, b: any) {
        return a.start_time_unix_nano - b.start_time_unix_nano;
      });
    } else {
      yaxis.sort(function (a: any, b: any) {
        return b.start_time_unix_nano - a.start_time_unix_nano;
      });
    }

    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const toggleDetails = (item: any) => {
    const itemIdToExpandedRowMapValues: any = { ...itemIdToExpandedRowMap };
    var id = item.span_id;
    if (itemIdToExpandedRowMapValues[id]) {
      delete itemIdToExpandedRowMapValues[id];
    } else {
      itemIdToExpandedRowMapValues[id] = (
        <EuiCodeBlock aria-label={'code'} language="json" isCopyable paddingSize="s">
          {JSON.stringify(item.show, null, 2)}
        </EuiCodeBlock>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns = [
    {
      align: RIGHT_ALIGNMENT,
      width: '40px',
      isExpander: true,
      name: (
        <EuiScreenReaderOnly>
          <span>Expand rows</span>
        </EuiScreenReaderOnly>
      ),
      render: (item: any) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.span_id] ? 'Collapse' : 'Expand'}
          style={{ color: '#6D63DB' }}
          iconType={itemIdToExpandedRowMap[item.span_id] ? 'arrowUp' : 'arrowDown'}
        />
      ),
    },
    {
      field: 'name',
      name: 'OPERATION',
      sortable: false,
      truncateText: true,
      width: maxWidht <= 768 ? '60%' : '75%',
    },
    {
      field: 'duration',
      name: 'DURATION',
      align: RIGHT_ALIGNMENT,
      truncateText: true,
      width: maxWidht <= 768 ? '15%' : '8%',
      render: (item: any) => <span>{item + 'ms'}</span>,
    },
    {
      field: 'duration',
      name: '',
      // truncateText:true,
      width: '18%',
      render: (item: any) => (
        <div
          style={{
            minWidth: `${100 - ((max - item) * 100) / max}%`,
            height: '10px',
            backgroundColor: `${
              item <= 50 ? '#BDBBFF' : item > 50 && item <= 200 ? '#9290E2' : '#6D63DB'
            }`,
            color: 'transparent',
            borderRadius: '25px',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          &nbsp;
        </div>
      ),
    },
  ];

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  if (isLoading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <EuiLoadingChart size="xl" />
      </div>
    );

  if (error) {
    toastNotifications.addWarning('Trace Not Found');
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Trace not found</div>;
  }

  return (
    <Fragment>
      <EuiBasicTable
        tableCaption="Sensedia Trace"
        items={yaxis}
        itemId="span_id"
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
        hasActions={true}
        columns={columns}
        sorting={sorting}
        isSelectable={true}
        onChange={onTableChange}
      />
    </Fragment>
  );
};

const currentProductName = async (hit: any) => {
  let obj = hit._source;
  Object.keys(obj).forEach(function (k) {
    var prop = k.split('.');
    var last = prop.pop();
    prop.reduce(function (o, key) {
      return (o[key] = o[key] || {});
    }, obj)[last] = obj[k];
    //   delete obj[k];
  });
  return obj;
};
