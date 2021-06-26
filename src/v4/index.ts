import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {
    ArcaeaDifficulty,
    BotArcApiUserinfoV4,
    BotArcApiSonginfo,
    BotArcApiScore,
    BotArcApiUserbest30,
    BotArcApiBatchRequest,
    BotArcApiResponseV4,
    BotArcApiBatchResponse,
    BotArcApiRatingInfo,
    BotArcApiRecent
} from "../types"

class BotArcApiV4User {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    /**
     * Search and return user info.
     * Use "recent" argument to get 0~7 recent score(s) of user.
     */
    public info(user: string, fuzzy: true, recent?: BotArcApiRecent): Promise<BotArcApiUserinfoV4>
    public info(usercode: string, fuzzy: false, recent?: BotArcApiRecent): Promise<BotArcApiUserinfoV4>
    public info(usercode: string, recent?: BotArcApiRecent): Promise<BotArcApiUserinfoV4>
    public info(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: BotArcApiRecent): Promise<BotArcApiUserinfoV4> {
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
        return new Promise<BotArcApiUserinfoV4>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/v4/user/info",
                params: params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as BotArcApiUserinfoV4)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    /**
     * Get one of user's best scores by user code, song name and difficulty.
     */
    public best(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
    public best(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
    public best(usercode: string, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
    public best(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore> {
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
        return new Promise<BotArcApiScore>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v4/user/best",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as BotArcApiScore)
                else reject(data.message || "undefined error occurred")
            }).catch(reject)
        })
    }

    /**
     * Get user's 30 best scores.
     */
    public best30(user: string, fuzzy: true): Promise<BotArcApiUserbest30>
    public best30(usercode: string, fuzzy: false): Promise<BotArcApiUserbest30>
    public best30(usercode: string): Promise<BotArcApiUserbest30>
    public best30(usercode: string, fuzzy?: boolean): Promise<BotArcApiUserbest30> {
        const axiosInstance = this.axios
        let params: Record<string, any> = {}
        if (fuzzy) params.user = usercode
        else params.usercode = usercode
        return new Promise<BotArcApiUserbest30>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "v4/user/best30",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as BotArcApiUserbest30)
                else reject(data.message || "undefined error occurred")
            }).catch(reject)
        })
    }
}

class BotArcApiV4Song {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    public info(songname: string): Promise<BotArcApiSonginfo> {
        const axiosInstance = this.axios
        return new Promise<BotArcApiSonginfo>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/song/info",
                params: {
                    songname
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as BotArcApiSonginfo)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public alias(songid: string): Promise<{ alias: Array<string> }> {
        const axiosInstance = this.axios
        return new Promise<{ alias: Array<string> }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/song/alias",
                params: {
                    songid
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { alias: Array<string> })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public id(songname: string): Promise<{ id: string }> {
        const axiosInstance = this.axios
        return new Promise<{id: string}>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/song/id",
                params: {
                    songname
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { id: string })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    /**
     * Roll a song from a given difficulty range.
     */
    public random(start?: number, end?: number): Promise<{ id: string, rating_class: number }> {
        const axiosInstance = this.axios
        return new Promise<{ id: string, rating_class: number }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/song/random",
                params: {
                    start,
                    end
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { id: string, rating_class: number })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public rating(start: number, end?: number): Promise<{ rating: Array<BotArcApiRatingInfo> }> {
        const axiosInstance = this.axios
        return new Promise<{ rating: Array<BotArcApiRatingInfo> }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/song/rating",
                params: {
                    start,
                    end
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { rating: Array<BotArcApiRatingInfo> })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }
}

class BotArcApiV4Forward {
    private readonly axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    public alloc(time?: number, clear?: boolean): Promise<{ access_token: string, valid_time: number }> {
        const axiosInstance = this.axios
        return new Promise<{ access_token: string, valid_time: number }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/forward/alloc",
                params: {
                    time,
                    clear
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { access_token: string, valid_time: number })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public forward(token: string, ...args: any): Promise<unknown> {
        const axiosInstance = this.axios
        return new Promise<unknown>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/forward/forward",
                params: {
                    token,
                    ...args
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public recycle(token: string): Promise<void> {
        const axiosInstance = this.axios
        return new Promise<void>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/forward/recycle",
                params: {
                    token
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(void 0)
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }

    public feed(token: string): Promise<{ valid_time: number }> {
        const axiosInstance = this.axios
        return new Promise<{ valid_time: number }>((resolve, reject) => {
            axiosInstance({
                method: "POST",
                url: "/v4/forward/feed",
                params: {
                    token
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as { valid_time: number })
                else {
                    reject(data.message || "undefined error occurred")
                }
            }).catch(reject)
        })
    }
}

export type BotArcApiScoreWithSongInfo = BotArcApiScore & { songInfo: BotArcApiSonginfo }
export type BotArcApiUserInfoV4WithSongInfo = BotArcApiUserinfoV4 & { recent_score?: Array<BotArcApiScoreWithSongInfo> }
export type BotArcApiUserBest30WithSongInfo = BotArcApiUserbest30 & { best30_list: Array<BotArcApiScoreWithSongInfo> }

class BotArcApiV4Util {
    private readonly axios: AxiosInstance
    private readonly api: BotArcApiV4

    constructor(axios: AxiosInstance, api: BotArcApiV4) {
        this.axios = axios
        this.api = api
    }

    /**
     * Get user/info, user/best, song/info of user/best, song/alias of user/best in one request
     */
    public userBest(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
        userBest: BotArcApiScore,
        songInfo: BotArcApiSonginfo,
        songAlias: Array<string>
    }>
    public userBest(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
        userBest: BotArcApiScore,
        songInfo: BotArcApiSonginfo,
        songAlias: Array<string>
    }>
    public userBest(usercode: string, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
        userBest: BotArcApiScore,
        songInfo: BotArcApiSonginfo,
        songAlias: Array<string>
    }>
    public userBest(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: ArcaeaDifficulty): Promise<{
        userBest: BotArcApiScore,
        songInfo: BotArcApiSonginfo,
        songAlias: Array<string>
    }> {
        const api = this.api
        let userParam: string, songnameParam: string, difficultyParam: string;
        if (typeof fuzzy === "boolean") {
            if (fuzzy) userParam = `user=${usercode}`
            else userParam = `usercode=${usercode}`
            songnameParam = `songname=${songname}`
            const _difficulty = (typeof difficulty === "number" && difficulty >= 0 && difficulty <= 3) ? difficulty : 2
            difficultyParam = `difficulty=${_difficulty}`
        } else {
            userParam = `usercode=${usercode}`
            songnameParam = `songname=${fuzzy}`
            const _difficulty = (typeof songname === "number" && songname >= 0 && songname <= 3) ? songname : 2
            difficultyParam = `difficulty=${_difficulty}`
        }

        return new Promise((resolve, reject) => {
            api.batch([{
                id: 0,
                bind: {
                    "$sid": "song_id"
                },
                endpoint: `user/best?${userParam}&${songnameParam}&${difficultyParam}`
            }, {
                id: 1,
                endpoint: `song/info?songname=$sid`
            }, {
                id: 2,
                endpoint: `song/alias?songid=$sid`
            }]).then(response => {
                const userBestResponse = response.filter(i => i.id === 0)[0]
                const songInfoResponse = response.filter(i => i.id === 1)[0]
                const songAliasResponse = response.filter(i => i.id === 2)[0]
                if (userBestResponse.result.status < 0) reject(userBestResponse.result.message)
                else if (songInfoResponse.result.status < 0) reject(songInfoResponse.result.message)
                else if (songAliasResponse.result.status < 0) reject(songAliasResponse.result.message)
                else {
                    const userBest = userBestResponse.result.content as BotArcApiScore
                    const songInfo = songInfoResponse.result.content as BotArcApiSonginfo
                    const songAlias = songAliasResponse.result.content as Array<string>
                    resolve({userBest, songInfo, songAlias})
                }
            }).catch(reject)
        })
    }

    public userBest30(user: string, fuzzy: true, recent?: BotArcApiRecent): Promise<{
        userInfo: BotArcApiUserInfoV4WithSongInfo,
        userBest30: BotArcApiUserBest30WithSongInfo
    }>
    public userBest30(usercode: string, fuzzy: false, recent?: BotArcApiRecent): Promise<{
        userInfo: BotArcApiUserInfoV4WithSongInfo,
        userBest30: BotArcApiUserBest30WithSongInfo
    }>
    public userBest30(usercode: string, recent?: BotArcApiRecent): Promise<{
        userInfo: BotArcApiUserInfoV4WithSongInfo,
        userBest30: BotArcApiUserBest30WithSongInfo
    }>
    public userBest30(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: BotArcApiRecent): Promise<{
        userInfo: BotArcApiUserInfoV4WithSongInfo,
        userBest30: BotArcApiUserBest30WithSongInfo
    }> {
        const api = this.api
        let userParam: string, recentParam: string, _recent: number;
        if (typeof fuzzy === "boolean") {
            if (fuzzy) userParam = `user=${usercode}`
            else userParam = `usercode=${usercode}`
            _recent = (typeof recent === "number" && recent >= 0 && recent <= 7) ? recent : 0
            if (_recent && _recent > 0) recentParam = `recent=${_recent}`
        } else {
            userParam = `usercode=${usercode}`
            _recent = (typeof fuzzy === "number" && fuzzy >= 0 && fuzzy <= 7) ? fuzzy : 0
            if (_recent && _recent > 0) recentParam = `recent=${_recent}`
        }
        return new Promise((resolve, reject) => {
            let batchCalls: Array<BotArcApiBatchRequest> =
                new Array<BotArcApiBatchRequest>({
                    id: 0,
                    bind: {},
                    endpoint: `user/best30?${userParam}`
                }, {
                    id: 1,
                    bind: {},
                    endpoint: `user/info?${userParam}${_recent && _recent > 0 ? ("&" + recentParam) : ""}`
                })
            for (let i = 0; i < 30; i++) {
                if (!batchCalls[0] || !batchCalls[0].bind) {
                    reject("lib internal error occurred")
                    return
                }
                batchCalls[0].bind[`\$${i + 1}`] = `best30_list[${i}].song_id`
                batchCalls.push({
                    id: 2 + i,
                    endpoint: `song/info?songname=\$${i + 1}`
                })
            }
            for (let i = 0; i < _recent; i++) {
                if (!batchCalls[1] || !batchCalls[1].bind) {
                    reject()
                    return
                }
                batchCalls[1].bind[`\$${31 + i}`] = `recent_score[${i}].song_id`
                batchCalls.push({
                    id: 32 + i,
                    endpoint: `song/info?songname=\$${31 + i}`
                })
            }
            api.batch(batchCalls).then(response => {
                const userBest30Response = response.filter(i => i.id === 0)[0]
                const userInfoResponse = response.filter(i => i.id === 1)[0]
                if (userBest30Response.result.status < 0) reject(userBest30Response.result.message)
                else if (userInfoResponse.result.status < 0) reject(userInfoResponse.result.message)
                else {
                    const userInfo: BotArcApiUserInfoV4WithSongInfo =
                        userInfoResponse.result.content as BotArcApiUserInfoV4WithSongInfo
                    const userBest30: BotArcApiUserBest30WithSongInfo =
                        userBest30Response.result.content as BotArcApiUserBest30WithSongInfo
                    const songInfoList = response
                        .filter(i => i.id > 1 && i.result.status === 0)
                        .map(i => i.result.content) as Array<BotArcApiSonginfo>
                    if (userInfo.recent_score) userInfo.recent_score.forEach((v, i, a) => {
                        const songInfo = songInfoList.filter(s => s.id === v.song_id)[0]
                        a[i] = {
                            ...a[i],
                            songInfo
                        } as BotArcApiScoreWithSongInfo
                    })
                    userBest30.best30_list.forEach((v, i, a) => {
                        const songInfo = songInfoList.filter(s => s.id === v.song_id)[0]
                        a[i] = {
                            ...a[i],
                            songInfo
                        } as BotArcApiScoreWithSongInfo
                    })
                    resolve({userInfo, userBest30})
                }
            }).catch(reject)
        })
    }
}

export class BotArcApiV4 {
    private axios: AxiosInstance
    public readonly user: BotArcApiV4User
    public readonly song: BotArcApiV4Song
    public readonly forward: BotArcApiV4Forward
    public readonly util: BotArcApiV4Util

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

        this.user = new BotArcApiV4User(axiosInstance)
        this.song = new BotArcApiV4Song(axiosInstance)
        this.forward = new BotArcApiV4Forward(axiosInstance)
        this.util = new BotArcApiV4Util(axiosInstance, this)

        return this
    }

    /**
     * This is the advance function for developer. You have to know all params and returns
     * to make a series of requests be in one. Of course, you may use encapsulated
     * functions in "util". These are really nice.
     */
    public batch(
        calls: string | Array<BotArcApiBatchRequest>
    ): Promise<Array<BotArcApiBatchResponse>> {
        const _calls = typeof calls === "string" ? JSON.parse(calls) : calls
        return new Promise<Array<BotArcApiBatchResponse>>((resolve, reject) => {
            this.axios({
                method: "POST",
                url: "/v4/batch",
                params: {
                    calls: JSON.stringify(_calls)
                }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as Array<BotArcApiBatchResponse>)
                else reject(data.message || "undefined error occurred")
            }).catch(reject)
        })
    }

    /**
     * The code in https://lowest.world/
     */
    public connect(): Promise<{key: string}> {
        return new Promise<{key: string}>((resolve, reject) => {
            axios({
                method: "GET",
                url: "v4/connect"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as {key: string})
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
                url: "v4/update"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4
                if (data.status === 0) resolve(data.content as {url: string, version: string})
                else reject(data.message || "undefined error occurred")
            })
        })
    }
}
