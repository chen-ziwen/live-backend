import {HttpRequestCore} from "../utils/request-core";

export class Request extends HttpRequestCore {
    // 实现axios多层拦截器
    constructor() {
        super();
        this.mService.interceptors.request.use(config => {
            let headers = config.headers || {};
            headers['accept'] = '*/*';
            headers['accept-language'] = 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6,vi;q=0.5;'
            headers['sec-fetch-dest'] = 'document';
            headers['sec-fetch-mode'] = 'navigate';
            headers['sec-fetch-site'] = 'none';
            headers['sec-fetch-user'] = '?1';
            headers['upgrade-insecure-requests'] = 1;
            config.headers = <any>headers;
            config.baseURL = "http://localhost:8080/" // 后续封装成方法，根据开发环境切换地址
            return config
        }, (err) => Promise.reject(err));

        this.mService.interceptors.response.use(response => {
            if (response.status !== 200) {
                let msg = {msg: 'net.Error', status: response.data};
                console.log(msg); // 后续用日志库输出
                let data = response.data;
                if (data.slice(0, 4) !== 'net.') {
                    data = `net.${data}`;
                }
                return Promise.reject(data);
            } else {
                let res = response.data;
                if (typeof res == "object" && res !== null) {
                    if (!res.suc) {
                        return Promise.reject(res.msg);
                    } else {
                        return res.data;
                    }
                }
                return res;
            }
        });
    }
}