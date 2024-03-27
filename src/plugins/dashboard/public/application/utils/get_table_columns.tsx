/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { History } from 'history';
import { EuiBetaBadge, EuiButton, EuiEmptyPrompt, EuiIcon, EuiLink, EuiBadge } from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';

import { ApplicationStart } from 'opensearch-dashboards/public';
import { VisualizationListItem } from 'src/plugins/visualizations/public';
import styled from 'styled-components';

export const NewTableListView = styled.div`
  background-color: #f9f9f9 !important;
  border: none !important;
  box-shadow: none !important;
`;
export const BtnCreate = styled(EuiButton)`
  border-radius: 100px;
  border: 1px solid #837ff6 !important;
  background-color: #837ff6 !important;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 24px;
  box-shadow: none;
  outline: none !important;
  margin-left: 24px;
  &:hover {
    list-style: none !important;
    text-decoration: none !important;
  }

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
  &:disabled {
    background-color: #c4c4c4;
    color: #fff;
    border: none;
    pointer-events: none;
  }
  a {
    color: #fff;
  }
`;

const getBadge = (item: VisualizationListItem) => {
  if (item.stage === 'beta') {
    return (
      <EuiBetaBadge
        className="visListingTable__betaIcon"
        label="B"
        title={i18n.translate('visualize.listing.betaTitle', {
          defaultMessage: 'Beta',
        })}
        tooltipContent={i18n.translate('visualize.listing.betaTooltip', {
          defaultMessage:
            'This visualization is in beta and is subject to change. The design and code is less mature than official GA ' +
            'features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA ' +
            'features',
        })}
      />
    );
  } else if (item.stage === 'experimental') {
    return (
      <EuiBetaBadge
        className="visListingTable__experimentalIcon"
        label="E"
        title={i18n.translate('visualize.listing.experimentalTitle', {
          defaultMessage: 'Experimental',
        })}
        tooltipContent={i18n.translate('visualize.listing.experimentalTooltip', {
          defaultMessage:
            'This visualization might be changed or removed in a future release and is not subject to the support SLA.',
        })}
      />
    );
  }
};

const renderItemTypeIcon = (item: VisualizationListItem) => {
  let icon;
  if (item.image) {
    icon = (
      <img className="visListingTable__typeImage" aria-hidden="true" alt="" src={item.image} />
    );
  } else {
    icon = (
      <EuiIcon
        className="visListingTable__typeIcon"
        aria-hidden="true"
        type={item.icon || 'empty'}
        size="m"
      />
    );
  }

  return icon;
};

export const getTableColumns = (application: ApplicationStart, history: History) => [
  {
    field: 'title',
    name: i18n.translate('visualize.listing.table.titleColumnName', {
      defaultMessage: 'Title',
    }),
    sortable: true,
    render: (field: string, { editApp, editUrl, title, error }: VisualizationListItem) =>
      // In case an error occurs i.e. the vis has wrong type, we render the vis but without the link
      !error ? (
        <EuiLink
          onClick={() => {
            if (editApp) {
              application.navigateToApp(editApp, { path: editUrl });
            } else if (editUrl) {
              history.push(editUrl);
            }
          }}
          data-test-subj={`visListingTitleLink-${title.split(' ').join('-')}`}
        >
          {field}
        </EuiLink>
      ) : (
        field
      ),
  },
  {
    field: 'typeTitle',
    name: i18n.translate('visualize.listing.table.typeColumnName', {
      defaultMessage: 'Type',
    }),
    sortable: true,
    render: (field: string, record: VisualizationListItem) =>
      !record.error ? (
        <span>
          {renderItemTypeIcon(record)}
          {record.typeTitle}
          {getBadge(record)}
        </span>
      ) : (
        <EuiBadge iconType="alert" color="warning">
          {record.error}
        </EuiBadge>
      ),
  },
  {
    field: 'description',
    name: i18n.translate('visualize.listing.table.descriptionColumnName', {
      defaultMessage: 'Description',
    }),
    sortable: true,
    render: (field: string, record: VisualizationListItem) => <span>{record.description}</span>,
  },
];

export const getNoItemsMessage = (createItem: () => void) => (
  <EuiEmptyPrompt
    style={{ marginTop: '15%' }}
    body={
      <>
        <p style={{ color: '#808080', fontSize: '22px' }}>
          You don’t have any visualization configured yet!
        </p>
      </>
    }
    actions={
      <BtnCreate onClick={createItem} data-test-subj="createDashboardPromptButton">
        Create your first Visualization
      </BtnCreate>
    }
  />
);
