//@ts-nocheck
import React from "react";
import Axios from '../../../../../../Interceptors/HttpRequest';
import { i18n } from '@osd/i18n';
// import mock from './mock.json';
import { parentTree } from "./util";
import { MetricGraph } from "./MetricGraph";
import { EuiLoadingChart } from '@elastic/eui';
import { DocViewRenderProps } from '../../doc_views/doc_views_types';
import { SensediaIAM } from '@sensedia-iam/auth'


import { getServices } from '../../../opensearch_dashboards_services';
export const Trace = ({ hit }: DocViewRenderProps) => {

  const [yaxis, setYaxis] = React.useState([]);
  const [xaxis, setXaxis] = React.useState([]);
  const [max, setMax] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user] = React.useState(SensediaIAM.me());

  const { toastNotifications } = getServices()
  React.useEffect(() => {
    setIsLoading(true)

    try {
      Axios.get(`/analytics/v1/products/api-platform/traces/${hit._id}`)
        .then(({ data }: any) => {
          parentTree(data).then( resp => {
            setXaxis(resp.x);
            setYaxis(resp.y);
            setMax(resp.max);
            setIsLoading(false)
          })

        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }

  }, []);

  if (isLoading)
    return <div style={{ textAlign: 'center', marginTop: '20px' }}><EuiLoadingChart size="xl" /></div>

  if (!xaxis) {
    toastNotifications.
      addWarning(
        i18n.translate('discover.trace-not-found', {
          defaultMessage: 'Trace Not Found',
        })
      );
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Trace not found</div>
  }



  return (<MetricGraph xaxis={xaxis} yaxis={yaxis} max={max} />);
};
