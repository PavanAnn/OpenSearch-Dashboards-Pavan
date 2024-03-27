/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import Xrange from 'highcharts/modules/xrange';
import { EuiText, EuiTextColor } from '@elastic/eui';

interface MatricGraphProps {
  yaxis: Array<{}> | undefined;
  xaxis: Array<{}> | undefined;
  max: number | 0;
}

export const MetricGraph = (props: MatricGraphProps) => {
  Xrange(Highcharts);

  const configObj = {
    chart: {
      type: 'xrange',
      enableMouseTracking: false,
      animation: false,
      events: {
        load(data: any) {
          const t = data.target.series[0].data;
          t.map((element: any) => {
            if (element.x2 - element.x <= 50) {
              element?.update({
                color: '#BDBBFF',
              });
            } else if (element.x2 - element.x > 50 && element.x2 - element.x <= 200) {
              element.update({
                color: '#6D63DB',
              });
            } else {
              element.update({
                color: '#413F7B',
              });
            }
          });
        },
      },
    },
    title: {
      text: ' ',
    },
    accessibility: {
      enable: false,
      //   point: {
      //     descriptionFormatter: function (point: any): any {
      //       return (point.index + 1) + '. ' + point.yCategory;
      //     }
      //   }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter(label: any) {
          return '';
          //  return label.value + "ms";
        },
        color: '#9F9F9F',
      },
      //  max: props.max,
      //  top: "-106%",
      title: {
        text: ' ',
      },
    },
    yAxis: {
      scrollbar: {
        enabled: true,
        showFull: false,
        liveRedraw: true,
      },
      max: Number(props.yaxis?.length) - 1 >= 9 ? 10 : Number(props.yaxis?.length) - 1,
      tickWidth: 1,
      categories: props.yaxis,
      title: { text: null },
      labels: {
        style: {
          fontSize: '13px',
        },
      },
      reversed: true,
    },
    tooltip: {
      //  headerFormat: "",
      //  formatter: function (this: any) {
      //     return Number(this.points[0].x2) - Number(this.points[0].x) + "ms";
      //  },
      // split: true,
      formatter(this: any) {
        return Number(this.x2) - Number(this.x) + 'ms';
      },
      enabled: true,
    },
    series: [
      {
        name: ' ',
        pointWidth: 10,
        data: props.xaxis,
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
      },
    ],

    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <EuiText>
        <p>
          <EuiTextColor color="default">Process Steps</EuiTextColor>
        </p>
      </EuiText>
      <HighchartsReact
        isPureConfig={true}
        highcharts={Highcharts}
        options={configObj}
        containerProps={{
          style: { height: '100%', width: '100%', marginTop: '50px' },
        }}
      />
    </>
  );
};
