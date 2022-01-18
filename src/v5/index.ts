import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {
    ArcaeaDifficulty,
    BotArcApiUserinfoV5,
    BotArcApiSonginfoV5,
    BotArcApiScore,
    BotArcApiUserbest30,
    BotArcApiResponseV4,
    BotArcApiRecent
} from "../types"

class BotArcApiV5User {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    /**
     * Search and return user info.
     * Use "recent" argument to get 0~7 recent score(s) of user.
     */
    public info(user: string, fuzzy: true, recent?: BotArcApiRecent): Promise<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }>
    public info(usercode: string, fuzzy: false, recent?: BotArcApiRecent): Promise<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }>
    public info(usercode: string, recent?: BotArcApiRecent): Promise<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }>
    public info(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: BotArcApiRecent): Promise<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }> {
        const axiosInstance = this.axios
        let params: Record<string, any> = {}
        if (typeof fuzzy === "boolean") {
            if (fuzzy) params.user = usercode
            else params.usercode = usercode
            const _recent = (typeof recent === "number" && recent >= 0 && recent <= 7) ? recent : 0
            if (_recent && _recent > 0) params.recent = _recent
        } else {
            params.usercode = usercode
            const _recent = (typeof fuzzy === "number" && fuzzy >= 0 && fuzzy <= 7) ? fuzzy : 0
            if (_recent && _recent > 0) params.recent = _recent
        }
        return new Promise<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/info",
                params: params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<{ account_info: BotArcApiUserinfoV5, recent_score: BotArcApiScore[] }>
                if (data.status === 0 && data.content) resolve(data.content)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    /**
     * Get one of user's best scores by user code, song name and difficulty.
     */
    public best(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty): Promise<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }>
    public best(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty): Promise<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }>
    public best(usercode: string, songname: string, difficulty?: ArcaeaDifficulty): Promise<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }>
    public best(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: ArcaeaDifficulty): Promise<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }> {
        const axiosInstance = this.axios
        let params: Record<string, any> = {}
        if (typeof fuzzy === "boolean") {
            if (fuzzy) params.user = usercode
            else params.usercode = usercode
            params.songname = songname
            params.difficulty = (typeof difficulty === "number" && difficulty >= 0 && difficulty <= 3) ? difficulty : 2
        } else {
            params.usercode = usercode
            params.songname = fuzzy
            params.difficulty = (typeof songname === "number" && songname >= 0 && songname <= 3) ? songname : 2
        }
        return new Promise<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/best",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<{ account_info: BotArcApiUserinfoV5, record: BotArcApiScore }>
                if (data.status === 0 && data.content) resolve(data.content)
                else reject(data.message || "undefined error occurred")
            }).catch(reject)
        })
    }

    /**
     * Get user's 30 best scores.
     */
    public best30(user: string, fuzzy: true): Promise<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }>
    public best30(usercode: string, fuzzy: false): Promise<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }>
    public best30(usercode: string): Promise<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }>
    public best30(usercode: string, fuzzy?: boolean): Promise<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }> {
        const axiosInstance = this.axios
        let params: Record<string, any> = {}
        if (fuzzy) params.user = usercode
        else params.usercode = usercode
        return new Promise<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/best30",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiUserbest30 & { account_info: BotArcApiUserinfoV5, best30_songinfo: BotArcApiSonginfoV5[], best30_overflow_songinfo: BotArcApiSonginfoV5[] }>
                if (data.status === 0 && data.content) resolve(data.content)
                else reject(data.message || "undefined error occurred")
            }).catch(reject)
        })
    }
}

class BotArcApiV5Song {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    public info(songname: string, fuzzy: true): Promise<BotArcApiSonginfoV5>
    public info(songid: string, fuzzy: false): Promise<BotArcApiSonginfoV5>
    public info(str: string, fuzzy: boolean = true): Promise<BotArcApiSonginfoV5> {
        const axiosInstance = this.axios
        return new Promise<BotArcApiSonginfoV5>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/song/info",
                params: fuzzy ? { songname: str } : { songid: str }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiSonginfoV5>
                if (data.status === 0 && data.content) resolve(data.content)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public alias(songname: string, fuzzy: true): Promise<{ alias: Array<string> }>
    public alias(songid: string, fuzzy: false): Promise<{ alias: Array<string> }>
    public alias(str: string, fuzzy: boolean = true): Promise<{ alias: Array<string> }> {
        const axiosInstance = this.axios
        return new Promise<{ alias: Array<string> }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/song/alias",
                params: fuzzy ? { songname: str } : { songid: str }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<{ alias: Array<string> }>
                if (data.status === 0 && data.content) resolve(data.content)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }
}

class BotArcApiV5Assets {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    public char(partner: number, awakened?: boolean): Promise<ArrayBuffer> {
        const axiosInstance = this.axios
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/assets/char",
                responseType: "arraybuffer",
                params: { partner, awakened }
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>
                    reject(responseJSON.message || "undefined error occurred")
                } else resolve(data)
            }).catch(reject)
        })
    }

    public icon(partner: number, awakened?: boolean): Promise<ArrayBuffer> {
        const axiosInstance = this.axios
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/assets/icon",
                responseType: "arraybuffer",
                params: { partner, awakened }
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>
                    reject(responseJSON.message || "undefined error occurred")
                } else resolve(data)
            }).catch(reject)
        })
    }

    public song(songname: string, fuzzy: true): Promise<ArrayBuffer>
    public song(songid: string, fuzzy: false): Promise<ArrayBuffer>
    public song(str: string, fuzzy: boolean = true): Promise<ArrayBuffer> {
        const axiosInstance = this.axios
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/assets/song",
                responseType: "arraybuffer",
                params: fuzzy ? { songname: str } : {songid: str}
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>
                    reject(responseJSON.message || "undefined error occurred")
                } else resolve(data)
            }).catch(reject)
        })
    }
}

export class BotArcApiV5 {
    private axios: AxiosInstance
    public readonly user: BotArcApiV5User
    public readonly song: BotArcApiV5Song
    public readonly assets: BotArcApiV5Assets

    constructor(axiosConfig?: AxiosRequestConfig)
    constructor(baseURL?: string, timeout?: number)
    constructor(baseURL?: string | AxiosRequestConfig, timeout?: number) {
        const createAxiosInstance = function (): AxiosInstance {
            if (typeof baseURL === "string") {
                return axios.create({
                    baseURL,
                    timeout: timeout || 30000
                })
            }
            return axios.create(baseURL)
        }
        const axiosInstance = createAxiosInstance()
        this.axios = axiosInstance

        this.user = new BotArcApiV5User(axiosInstance)
        this.song = new BotArcApiV5Song(axiosInstance)
        this.assets = new BotArcApiV5Assets(axiosInstance)

        return this
    }

    /**
     * The code in https://lowest.world/
     */
    public connect(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            axios({
                method: "GET",
                url: "/connect"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<string>
                if (data.status === 0 && data.content) resolve(data.content)
                else reject(data.message || "undefined error occurred")
            })
        })
    }

    /**
     * Latest version and download link of Arcaea(China ver.)
     */
    public update(): Promise<{url: string, version: string}> {
        return new Promise<{url: string, version: string}>((resolve, reject) => {
            axios({
                method: "GET",
                url: "/update"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<{url: string, version: string}>
                if (data.status === 0 && data.content) resolve(data.content)
                else reject(data.message || "undefined error occurred")
            })
        })
    }
}
