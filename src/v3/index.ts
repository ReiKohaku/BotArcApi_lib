import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    ArcaeaDifficulty,
    BotArcApiResponse,
    BotArcApiScore,
    BotArcApiSonginfo,
    BotArcApiUserbest30,
    BotArcApiUserinfoV4
} from "../types";

class BotArcApiV3Arc {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public alloc(time?: number, clear?: boolean): Promise<{access_token: string, valid_time: number}> {
        const axiosInstance = this.axios;
        return new Promise<{access_token: string, valid_time: number}>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/arc/alloc",
                params: {
                    time,
                    clear
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<{access_token: string, valid_time: number}>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }

    public forward(token: string, method: "GET" | "get" | "POST" | "post", url: string, params: Record<string, any>) {
        const axiosInstance = this.axios;
        return new Promise((resolve, reject) => {
            axiosInstance({
                method,
                url: "v3/arc/forward" + url.startsWith("/") ? "" : "/" + url,
                params,
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<unknown>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }

    public recycle(token: string) {
        const axiosInstance = this.axios;
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/arc/recycle",
                params: {
                    token
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<void>;
                if (data.status === 0) resolve(void 0);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
}

export class BotArcApiV3 {
    private readonly axios: AxiosInstance;
    public readonly arc: BotArcApiV3Arc;

    constructor(axiosConfig?: AxiosRequestConfig)
    constructor(baseURL?: string, timeout?: number)
    constructor(baseURL?: string | AxiosRequestConfig, timeout?: number) {
        function createAxiosInstance() {
            if (typeof baseURL === "string") {
                return axios.create({
                    baseURL,
                    timeout: timeout || 30000
                });
            } else {
                return axios.create(baseURL);
            }
        }
        const axiosInstance = createAxiosInstance();
        this.axios = axiosInstance;

        this.arc = new BotArcApiV3Arc(axiosInstance);

        return this;
    }

    userinfo(usercode: string, recent?: boolean): Promise<BotArcApiUserinfoV4> {
        const axiosInstance = this.axios;
        return new Promise<BotArcApiUserinfoV4>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/v3/userinfo",
                params: {
                    usercode,
                    recent
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as {status: number, content: unknown};
                if (data.status === 0) resolve(data.content as BotArcApiUserinfoV4);
                else {
                    reject(data.status || "undefined error occurred");
                }
            }).catch(reject);
        });
    }
    userbest(usercode: string, songname: string, difficulty: ArcaeaDifficulty): Promise<BotArcApiScore> {
        const axiosInstance = this.axios;
        return new Promise<BotArcApiScore>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/userbest",
                params: {
                    usercode,
                    songname,
                    difficulty
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as {status: number, content: unknown};
                if (data.status === 0) resolve(data.content as BotArcApiScore);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    userbest30(usercode: string): Promise<BotArcApiUserbest30> {
        const axiosInstance = this.axios;
        return new Promise<BotArcApiUserbest30>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/userbest30",
                params: {
                    usercode
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as {status: number, content: unknown};
                if (data.status === 0) resolve(data.content as BotArcApiUserbest30);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    songinfo(songname: string): Promise<BotArcApiSonginfo> {
        const axiosInstance = this.axios;
        return new Promise<BotArcApiSonginfo>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/songinfo",
                params: {
                    songname
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<BotArcApiSonginfo>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    songalias(songname: string): Promise<{id: string}> {
        const axiosInstance = this.axios;
        return new Promise<{id: string}>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/songalias",
                params: {
                    songname
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<{id: string}>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    update(): Promise<{url: string, version: string}> {
        const axiosInstance = this.axios;
        return new Promise<{url: string, version: string}>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/update"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<{url: string, version: string}>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    random(start?: number, end?: number, info?: true): Promise<{id: string, ratingClass: ArcaeaDifficulty, song_info: BotArcApiSonginfo}>
    random(start?: number, end?: number, info?: false): Promise<{id: string, ratingClass: ArcaeaDifficulty}>
    random(start?: number, end?: number, info?: boolean): Promise<{id: string, ratingClass: ArcaeaDifficulty, song_info?: BotArcApiSonginfo}> {
        const axiosInstance = this.axios;
        return new Promise<{id: string, ratingClass: ArcaeaDifficulty, song_info?: BotArcApiSonginfo}>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/update",
                params: {
                    start,
                    end,
                    info
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<{id: string, ratingClass: ArcaeaDifficulty, song_info?: BotArcApiSonginfo}>;
                if (data.status === 0 && data.content) {
                    if (info) resolve(data.content as {id: string, ratingClass: ArcaeaDifficulty, song_info: BotArcApiSonginfo});
                    else resolve(data.content as {id: string, ratingClass: ArcaeaDifficulty});
                }
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
    connect(): Promise<{key: string}> {
        const axiosInstance = this.axios;
        return new Promise<{key: string}>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v3/connect"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponse<{key: string}>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.status || "undefined error occurred");
            }).catch(reject);
        });
    }
}
