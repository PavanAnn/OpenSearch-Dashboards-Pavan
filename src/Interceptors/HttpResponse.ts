/* eslint-disable @osd/eslint/require-license-header */
import { SensediaIAM } from '@sensedia-iam/auth';
import Axios from './HttpRequest';

// eslint-disable-next-line import/no-default-export
export default SensediaIAM.responseInterceptor(Axios);
