import {AxiosAdapter, AxiosInstance, AxiosResponse} from "axios";
import {userAgent} from "../const/user-agent";

export class HttpRequestCore {
    protected mService: AxiosInstance;
    protected mLocked: number;
    protected mLockedHandler: Nodejs.TIMEOUT | null;

    constructor(ses?: string) {
        this.mLocked = 0;
        this.mLockedHandler = null;
        const options = {
            headers: {
                "User-Agent": userAgent
            },
            adapter: <AxiosAdapter>axiosElectronAdapter,
            timeout: 3000,
            timeoutErrorMessage: "net.Timout",
            withCredentials: true
        };
        if (ses) {
            options.session = ses;
        }
        this.mService = axios.create(options);

        this.mService.interceptors.response.use((response: AxiosResponse) => {
            if (response.status !== 200) {
                this.lock();
            } else {
                this.mLocked = 0;
            }
            return response;
        });
    }

    get locked() {
        return this.mLocked > 3;
    }

    lock() {
        this.mLocked++;
        if (this.mLocked > 3) {
            if (this.mLockedHandler) {
                clearTimeout(this.mLockedHandler);
            }
        }
        this.mLockedHandler = setTimeout(() => {
                this.mLocked = 0;
            },
            4e4 * Math.pow(2, this.mLocked));
    }

    get(uri: string, params?: any): Promise<any> {
        if (this.locked) {
            return Promise.reject("net.APILOCKED");
        }
        return this.mSerivces.get(uri, {params}).catch((err) => {
            let msg = err;
            if (err && err.response) {
                msg = err.response.data;
            }
            return Promise.reject(msg);
        });
    }

    /**
     *
     * @param uri
     * @param params  请求体x-www-form-urlencoded表单格式
     */
    post(uri: string, params: any): Promise<any> {
        if (this.locked) {
            return Promise.reject("net.APILOCKED");
        }
        let data: URLSearchParams = new URLSearchParams();
        if (params) {
            if (params instanceof URLSearchParams) {
                data = params;
            } else {
                for (let key in params) {
                    if (Array.isArray(params[key])) {
                        for (let key2 in parmas[key]) {
                            data.append(`${key}[]`, params[key][key2]);
                        }
                    } else {
                        data.append(key, params[key]);
                    }
                }
            }
        }
    }

    /**
     *
     * @param uri
     * @param params 请求体JSON格式
     */
    postJson(uri: string, params: any): Promise<any> {
        if (this.locked) {
            return Promise.reject("net.APILOCKED");
        }
        const data = JSON.stringify(params);
        return this.mService.post(uri, data).catch(err => {
            if (err?.response?.data) {
                return Promise.reject(err.response.data);
            } else {
                return Promise.reject(err);
            }
        })
    }
}

