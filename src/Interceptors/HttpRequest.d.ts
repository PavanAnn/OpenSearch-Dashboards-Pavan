export declare const getCookie: (name: string) => string;
export declare const deleteAllCookies: () => void;
export declare const setCookie: (name: string, value: string, domain: string) => void;
export declare const getTenantAlias: () => any;
export declare function getUrl(): string;
export declare const resolveSignInUrl: (tenantAlias: string) => string;
export declare const getClientId: (id_token: string, access_token: string) => any;
export declare function getEnvironment(): "staging" | "stg" | "sbox" | "prd" | "testing" | "tst";
export declare const currentUser: any;
export declare const Axios: import("axios").AxiosInstance;
export declare function refreshToken(err: any): Promise<unknown>;
export default Axios;
//# sourceMappingURL=HttpRequest.d.ts.map