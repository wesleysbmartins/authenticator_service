import { AxiosRequestConfig } from "axios";

export interface IAxios {
    post (url: string, data: any, config: AxiosRequestConfig) : Promise<any>
}
