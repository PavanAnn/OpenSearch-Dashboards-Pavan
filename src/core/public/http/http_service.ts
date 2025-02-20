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

import { HttpSetup, HttpStart } from './types';
import { InjectedMetadataSetup } from '../injected_metadata';
import { FatalErrorsSetup } from '../fatal_errors';
import { BasePath } from './base_path';
import { AnonymousPathsService } from './anonymous_paths_service';
import { LoadingCountService } from './loading_count_service';
import { Fetch } from './fetch';
import { CoreService } from '../../types';
import { getWorkspaceIdFromUrl } from '../utils';
import { WORKSPACE_PATH_PREFIX } from '../../utils/constants';

interface HttpDeps {
  injectedMetadata: InjectedMetadataSetup;
  fatalErrors: FatalErrorsSetup;
}

/** @internal */
export class HttpService implements CoreService<HttpSetup, HttpStart> {
  private readonly anonymousPaths = new AnonymousPathsService();
  private readonly loadingCount = new LoadingCountService();
  private service?: HttpSetup;

  public setup({ injectedMetadata, fatalErrors }: HttpDeps): HttpSetup {
    const opensearchDashboardsVersion = injectedMetadata.getOpenSearchDashboardsVersion();
    let clientBasePath = '';
    const workspaceId = getWorkspaceIdFromUrl(window.location.href);
    if (workspaceId) {
      clientBasePath = `${WORKSPACE_PATH_PREFIX}/${workspaceId}`;
    }
    const basePath = new BasePath(
      injectedMetadata.getBasePath(),
      injectedMetadata.getServerBasePath(),
      clientBasePath
    );
    const fetchService = new Fetch({ basePath, opensearchDashboardsVersion });
    const loadingCount = this.loadingCount.setup({ fatalErrors });
    loadingCount.addLoadingCountSource(fetchService.getRequestCount$());

    this.service = {
      basePath,
      anonymousPaths: this.anonymousPaths.setup({ basePath }),
      intercept: fetchService.intercept.bind(fetchService),
      fetch: fetchService.fetch.bind(fetchService),
      delete: fetchService.delete.bind(fetchService),
      get: fetchService.get.bind(fetchService),
      head: fetchService.head.bind(fetchService),
      options: fetchService.options.bind(fetchService),
      patch: fetchService.patch.bind(fetchService),
      post: fetchService.post.bind(fetchService),
      put: fetchService.put.bind(fetchService),
      ...loadingCount,
    };

    return this.service;
  }

  public start() {
    if (!this.service) {
      throw new Error(`HttpService#setup() must be called first!`);
    }

    return this.service;
  }

  public stop() {
    this.loadingCount.stop();
  }
}
