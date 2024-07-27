import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios";
import { IAxios } from "./IAxios";

export class Axios implements IAxios {
    instance: AxiosInstance;

    constructor (baseUrl: string, headers: AxiosHeaders) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: 2000,
            headers: headers,
        });
    }
    
    async post(url: string, data: any, config: AxiosRequestConfig): Promise<any> {
        const res = await this.instance.post(url, data, config);
        return res.data;
    }
    
}
