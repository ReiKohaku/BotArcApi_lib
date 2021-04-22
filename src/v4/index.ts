import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {
    ArcaeaDifficulty,
    BotArcApiUserinfo,
    BotArcApiSonginfo,
    BotArcApiScore,
    BotArcApiUserbest30,
    BotArcApiBatchRequest,
    BotArcApiResponseV4,
    BotArcApiBatchResponse,
    BotArcApiRatingInfo,
    BotArcApiRecent
} from "../types"

class BotArcApiV4 {
    private axios: AxiosInstance
    public readonly user: {
        info: Function
        best: Function
        best30: Function
    }
    public readonly song: {
        info: Function
        alias: Function
        random: Function
        rating: Function
    }
    public readonly util: {
        userBest: Function
        userBest30: Function
    }

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
        const that = this

        /**
         * Search and return user info.
         * Use "recent" argument to get 0~7 recent score(s) of user.
         */
        function user_info(user: string, fuzzy: true, recent?: BotArcApiRecent): Promise<BotArcApiUserinfo>
        function user_info(usercode: string, fuzzy: false, recent?: BotArcApiRecent): Promise<BotArcApiUserinfo>
        function user_info(usercode: string, recent?: BotArcApiRecent): Promise<BotArcApiUserinfo>
        function user_info(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: BotArcApiRecent): Promise<BotArcApiUserinfo> {
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
            return new Promise<BotArcApiUserinfo>((resolve, reject) => {
                axiosInstance({
                    method: "GET",
                    url: "/v4/user/info",
                    params: params
                }).then((response: AxiosResponse) => {
                    const data = response.data as BotArcApiResponseV4
                    if (data.status === 0) resolve(data.content as BotArcApiUserinfo)
                    else {
                        reject(data.message || "undefined error occurred")
                    }
                }).catch(reject)
            })
        }

        /**
         * Get one of user's best scores by user code, song name and difficulty.
         */
        function user_best(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
        function user_best(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
        function user_best(usercode: string, songname: string, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore>
        function user_best(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: ArcaeaDifficulty): Promise<BotArcApiScore> {
            let params: Record<string, any> = {}
            if (typeof fuzzy === "boolean") {
                if (fuzzy) params.user = usercode
                else params.usercode = usercode
                params.songname = songname
                const _difficulty = (typeof difficulty === "number" && difficulty >= 0 && difficulty <= 3) ? difficulty : 2
                params.difficulty = _difficulty
            } else {
                params.usercode = usercode
                params.songname = fuzzy
                const _difficulty = (typeof songname === "number" && songname >= 0 && songname <= 3) ? songname : 2
                params.difficulty = _difficulty
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
        function user_best30(user: string, fuzzy: true): Promise<BotArcApiUserbest30>
        function user_best30(usercode: string, fuzzy?: boolean): Promise<BotArcApiUserbest30> {
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

        this.user = {
            info: user_info,
            best: user_best,
            best30: user_best30
        }

        this.song = {
            info: function (songname: string): Promise<BotArcApiSonginfo> {
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
            },
            alias: function (songid: string): Promise<{ alias: Array<string> }> {
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
            },
            /**
             * Roll a song from a given difficulty range.
             */
            random: function (start?: number, end?: number): Promise<{ id: string, rating: number }> {
                return new Promise<{ id: string, rating: number }>((resolve, reject) => {
                    axiosInstance({
                        method: "POST",
                        url: "/v4/song/random",
                        params: {
                            start,
                            end
                        }
                    }).then((response: AxiosResponse) => {
                        const data = response.data as BotArcApiResponseV4
                        if (data.status === 0) resolve(data.content as { id: string, rating: number })
                        else {
                            reject(data.message || "undefined error occurred")
                        }
                    }).catch(reject)
                })
            },
            rating: function (start: number, end?: number): Promise<{ rating: Array<BotArcApiRatingInfo> }> {
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

        /**
         * Get user/info, user/best, song/info of user/best, song/alias of user/best in one request
         */
        function util_userBest(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
            userBest: BotArcApiScore,
            songInfo: BotArcApiSonginfo,
            songAlias: Array<string>
        }>
        function util_userBest(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
            userBest: BotArcApiScore,
            songInfo: BotArcApiSonginfo,
            songAlias: Array<string>
        }>
        function util_userBest(usercode: string, songname: string, difficulty?: ArcaeaDifficulty): Promise<{
            userBest: BotArcApiScore,
            songInfo: BotArcApiSonginfo,
            songAlias: Array<string>
        }>
        function util_userBest(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: ArcaeaDifficulty): Promise<{
            userBest: BotArcApiScore,
            songInfo: BotArcApiSonginfo,
            songAlias: Array<string>
        }> {
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
                that.batch([{
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

        type BotArcApiScoreWithSongInfo = BotArcApiScore & { songInfo: BotArcApiSonginfo }
        type BotArcApiUserinfoWithSongInfo = BotArcApiUserinfo & { recent_score?: Array<BotArcApiScoreWithSongInfo> }
        type BotArcApiUserbest30WithSongInfo = BotArcApiUserbest30 & { best30_list: Array<BotArcApiScoreWithSongInfo> }

        function util_userBest30(user: string, fuzzy: true, recent?: BotArcApiRecent): Promise<{
            userInfo: BotArcApiUserinfoWithSongInfo,
            userBest30: BotArcApiUserbest30WithSongInfo
        }>
        function util_userBest30(usercode: string, fuzzy: false, recent?: BotArcApiRecent): Promise<{
            userInfo: BotArcApiUserinfoWithSongInfo,
            userBest30: BotArcApiUserbest30WithSongInfo
        }>
        function util_userBest30(usercode: string, recent?: BotArcApiRecent): Promise<{
            userInfo: BotArcApiUserinfoWithSongInfo,
            userBest30: BotArcApiUserbest30WithSongInfo
        }>
        function util_userBest30(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: BotArcApiRecent): Promise<{
            userInfo: BotArcApiUserinfoWithSongInfo,
            userBest30: BotArcApiUserbest30WithSongInfo
        }> {
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
                that.batch(batchCalls).then(response => {
                    const userBest30Response = response.filter(i => i.id === 0)[0]
                    const userInfoResponse = response.filter(i => i.id === 1)[0]
                    if (userBest30Response.result.status < 0) reject(userBest30Response.result.message)
                    else if (userInfoResponse.result.status < 0) reject(userInfoResponse.result.message)
                    else {
                        const userInfo: BotArcApiUserinfoWithSongInfo =
                            userInfoResponse.result.content as BotArcApiUserinfoWithSongInfo
                        const userBest30: BotArcApiUserbest30WithSongInfo =
                            userBest30Response.result.content as BotArcApiUserbest30WithSongInfo
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

        this.util = {
            userBest: util_userBest,
            userBest30: util_userBest30
        }

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

export default BotArcApiV4
