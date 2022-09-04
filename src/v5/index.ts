import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    ArcaeaDifficulty,
    BotArcApiResponseV4,
    BotArcApiRecent,
    BotArcApiDifficultyRange,
    BotArcApiContentV5,
    BotArcApiDifficultyInfoV5,
} from "../types";

class BotArcApiV5User {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Search and return user info.
     * Use "recent" argument to get 0~7 recent score(s) of user.
     */
    
    /**
     * @function info - Search and return user info.
     * @param {string} user - Arcaea Friend ID or username.
     * @param {boolean} [fuzzy=true] - Should query be username as well as friend ID? null or false means "no and only friend ID".
     * @param {boolean | BotArcApiRecent | number} [recent] - How many recent scores should the API includes? If null, false or 0, then no recent.
     * @param {boolean} [withSongInfo=false] - Returns Songinfos if true (Only available if fuzzy is true and BotArcApiRecent is higher than 0)
     * @returns {Promise<BotArcApiContentV5.User.Info>} - Returns the info
     */
    public info(user: string, fuzzy: true, recent?: BotArcApiRecent, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Info>
    /**
     * @function info - Search and return user info.
     * @param {string} usercode - Arcaea Friend ID 
     * @param {boolean} [fuzzy=false] - Should query be username as well as friend ID? null or false means "no and only friend ID".
     * @param {boolean | BotArcApiRecent | number} [recent] - How many recent scores should the API includes? If null, false or 0, then no recent.
     * @param {boolean} [withSongInfo=false] - Returns Songinfos if true (Only available if fuzzy is true and BotArcApiRecent is higher than 0)
     * @returns {Promise<BotArcApiContentV5.User.Info>} - Returns the info
     */
    public info(usercode: string, fuzzy: false, recent?: BotArcApiRecent, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Info>
    /**
     * @function info - Search and return user info.
     * @param {string} usercode - Arcaea Friend ID 
     * @param {boolean | BotArcApiRecent | number} [recent] - How many recent scores should the API includes? If null, false or 0, then no recent.
     * @param {boolean} [withSongInfo=false] - Returns Songinfos if true (Only available if fuzzy is true and BotArcApiRecent is higher than 0)
     * @returns {Promise<BotArcApiContentV5.User.Info>} - Returns the info
     */
    public info(usercode: string, recent?: BotArcApiRecent, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Info>
    /**
     * @function info - Search and return user info.
     * @param {string} usercode - Arcaea Friend ID 
     * @param {boolean} [fuzzy] - Should query be username as well as friend ID? null or false means "no and only friend ID".
     * @param {boolean | BotArcApiRecent | number } [recent] - How many recent scores should the API includes? If null, false or 0, then no recent.
     * @param {boolean} [withSongInfo=false] - Returns Songinfos if true (Only available if fuzzy is true and BotArcApiRecent is higher than 0)
     * @returns {Promise<BotArcApiContentV5.User.Info>} - Returns the info
     */
    public info(usercode: string, fuzzy?: boolean | BotArcApiRecent, recent?: boolean | BotArcApiRecent, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Info> {
        const axiosInstance = this.axios;
        let params: Record<string, any> = {};
        if (typeof fuzzy === "boolean") {
            if (fuzzy) params.user = usercode;
            else params.usercode = usercode;
            const _recent = (typeof recent === "number" && recent >= 0 && recent <= 7) ? recent : 0;
            if (_recent && _recent > 0) params.recent = _recent;
            if (withSongInfo) params.withSongInfo = true;
        } else {
            params.usercode = usercode;
            const _recent = (typeof fuzzy === "number" && fuzzy >= 0 && fuzzy <= 7) ? fuzzy : 0;
            if (_recent && _recent > 0) params.recent = _recent;
            if (recent) params.withSongInfo = true;
        }
        return new Promise<BotArcApiContentV5.User.Info>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/info",
                params: params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiContentV5.User.Info>;
                if (data.status === 0 && data.content) resolve(data.content);
                else {
                    reject(data.message || "undefined error occurred");
                }
            }).catch(reject);
        });
    }

    /**
     * Get one of user's best scores by user code, song name and difficulty.
     */
    public best(user: string, fuzzy: true, songname: string, difficulty?: ArcaeaDifficulty, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Best>
    public best(usercode: string, fuzzy: false, songname: string, difficulty?: ArcaeaDifficulty, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Best>
    public best(usercode: string, songname: string, difficulty?: ArcaeaDifficulty, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Best>
    public best(usercode: string, fuzzy: boolean | string, songname?: string | ArcaeaDifficulty, difficulty?: boolean | ArcaeaDifficulty, withSongInfo?: boolean): Promise<BotArcApiContentV5.User.Best> {
        const axiosInstance = this.axios;
        let params: Record<string, any> = {};
        if (typeof fuzzy === "boolean") {
            if (fuzzy) params.user = usercode;
            else params.usercode = usercode;
            params.songname = songname;
            params.difficulty = (typeof difficulty === "number" && difficulty >= 0 && difficulty <= 3) ? difficulty : 2;
            if (withSongInfo) params.withsonginfo = true;
        } else {
            params.usercode = usercode;
            params.songname = fuzzy;
            params.difficulty = (typeof songname === "number" && songname >= 0 && songname <= 3) ? songname : 2;
            if (difficulty) params.withsonginfo = true;
        }
        return new Promise<BotArcApiContentV5.User.Best>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/best",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiContentV5.User.Best>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.message || "undefined error occurred");
            }).catch(reject);
        });
    }

    /**
     * Get user's 30 best scores.
     */
    public best30(user: string, fuzzy: true, withSongInfo?: boolean, overflow?: number): Promise<BotArcApiContentV5.User.Best30>
    public best30(usercode: string, fuzzy: false, withSongInfo?: boolean, overflow?: number): Promise<BotArcApiContentV5.User.Best30>
    public best30(usercode: string): Promise<BotArcApiContentV5.User.Best30>
    public best30(usercode: string, fuzzy?: boolean, withSongInfo?: boolean, overflow?: number): Promise<BotArcApiContentV5.User.Best30> {
        const axiosInstance = this.axios;
        let params: Record<string, any> = {};
        if (fuzzy) params.user = usercode;
        else params.usercode = usercode;
        if (withSongInfo) params.withsonginfo = true;
        if (overflow) params.overflow = overflow;
        return new Promise<BotArcApiContentV5.User.Best30>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/user/best30",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiContentV5.User.Best30>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.message || "undefined error occurred");
            }).catch(reject);
        });
    }
}

class BotArcApiV5Song {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public info(songname: string, fuzzy: true): Promise<BotArcApiDifficultyInfoV5[]>
    public info(songid: string, fuzzy: false): Promise<BotArcApiDifficultyInfoV5[]>
    public info(str: string, fuzzy: boolean = true): Promise<BotArcApiDifficultyInfoV5[]> {
        const axiosInstance = this.axios;
        return new Promise<BotArcApiDifficultyInfoV5[]>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/song/info",
                params: fuzzy ? { songname: str } : { songid: str }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiDifficultyInfoV5[]>;
                if (data.status === 0 && data.content) resolve(data.content);
                else {
                    reject(data.message || "undefined error occurred");
                }
            }).catch(reject);
        });
    }

    public alias(songname: string, fuzzy: true): Promise<string[]>
    public alias(songid: string, fuzzy: false): Promise<string[]>
    public alias(str: string, fuzzy: boolean = true): Promise<string[]> {
        const axiosInstance = this.axios;
        return new Promise<string[]>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/song/alias",
                params: fuzzy ? { songname: str } : { songid: str }
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<string[]>;
                if (data.status === 0 && data.content) resolve(data.content);
                else {
                    reject(data.message || "undefined error occurred");
                }
            }).catch(reject);
        });
    }

    public random(withSongInfo?: boolean): Promise<BotArcApiContentV5.Song.Random>
    public random(start?: BotArcApiDifficultyRange, withSongInfo?: boolean): Promise<BotArcApiContentV5.Song.Random>
    public random(start?: BotArcApiDifficultyRange, end?: BotArcApiDifficultyRange): Promise<BotArcApiContentV5.Song.Random>
    public random(start?: BotArcApiDifficultyRange, end?: BotArcApiDifficultyRange, withSongInfo?: boolean): Promise<BotArcApiContentV5.Song.Random>
    public random(start?: BotArcApiDifficultyRange | boolean, end?: BotArcApiDifficultyRange | boolean, withSongInfo?: boolean): Promise<BotArcApiContentV5.Song.Random> {
        const axiosInstance = this.axios;
        const params: Record<string, any> = {};
        if ((typeof start === 'boolean' && start) || (typeof end === 'boolean' && end) || withSongInfo) params.withsonginfo = true;
        if (typeof start === 'string') params.start = start;
        if (typeof end === 'string') params.end = end;
        return new Promise<BotArcApiContentV5.Song.Random>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/song/random",
                params
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<BotArcApiContentV5.Song.Random>;
                if (data.status === 0 && data.content) resolve(data.content);
                else {
                    reject(data.message || "undefined error occurred");
                }
            }).catch(reject);
        });
    }
}

class BotArcApiV5Assets {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public char(partner: number, awakened?: boolean): Promise<ArrayBuffer> {
        const axiosInstance = this.axios;
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/assets/char",
                responseType: "arraybuffer",
                params: { partner, awakened }
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data;
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>;
                    reject(responseJSON.message || "undefined error occurred");
                } else resolve(data);
            }).catch(reject);
        });
    }

    public icon(partner: number, awakened?: boolean): Promise<ArrayBuffer> {
        const axiosInstance = this.axios;
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/assets/icon",
                responseType: "arraybuffer",
                params: { partner, awakened }
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data;
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>;
                    reject(responseJSON.message || "undefined error occurred");
                } else resolve(data);
            }).catch(reject);
        });
    }

    public song(songname: string, fuzzy: true, beyond?: boolean): Promise<ArrayBuffer>
    public song(songid: string, fuzzy: false, beyond?: boolean): Promise<ArrayBuffer>
    public song(str: string, fuzzy: boolean = true, beyond: boolean = false): Promise<ArrayBuffer> {
        const axiosInstance = this.axios;
        let params: Record<string, any> = {};
        if (fuzzy) params.songname = str;
        else params.songid = str;
        if (beyond) params.difficulty = 3;
        return new Promise<ArrayBuffer>((resolve, reject) => {
            axiosInstance({
                method: "GET",
                url: "/assets/song",
                responseType: "arraybuffer",
                params
            }).then((response: AxiosResponse<ArrayBuffer>) => {
                const data = response.data;
                if (response.headers["content-type"].includes("application/json")) {
                    const responseJSON = JSON.parse(Buffer.from(data).toString("utf-8")) as BotArcApiResponseV4<undefined>;
                    reject(responseJSON.message || "undefined error occurred");
                } else resolve(data);
            }).catch(reject);
        });
    }
}

export class BotArcApiV5 {
    private axios: AxiosInstance;
    public readonly user: BotArcApiV5User;
    public readonly song: BotArcApiV5Song;
    public readonly assets: BotArcApiV5Assets;

    constructor(axiosConfig?: AxiosRequestConfig)
    constructor(baseURL?: string, timeout?: number)
    constructor(baseURL?: string | AxiosRequestConfig, timeout?: number) {
        const createAxiosInstance = function (): AxiosInstance {
            if (typeof baseURL === "string") {
                return axios.create({
                    baseURL,
                    timeout: timeout || 30000
                });
            }
            return axios.create(baseURL);
        }
        const axiosInstance = createAxiosInstance();
        this.axios = axiosInstance;

        this.user = new BotArcApiV5User(axiosInstance);
        this.song = new BotArcApiV5Song(axiosInstance);
        this.assets = new BotArcApiV5Assets(axiosInstance);

        return this;
    }

    /**
     * The code in https://lowest.world/
     * @deprecated
     */
    public connect(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.axios({
                method: "GET",
                url: "/connect"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<string>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.message || "undefined error occurred");
            });
        });
    }

    /**
     * Latest version and download link of Arcaea(China ver.)
     */
    public update(): Promise<{url: string, version: string}> {
        return new Promise<{url: string, version: string}>((resolve, reject) => {
            this.axios({
                method: "GET",
                url: "/update"
            }).then((response: AxiosResponse) => {
                const data = response.data as BotArcApiResponseV4<{url: string, version: string}>;
                if (data.status === 0 && data.content) resolve(data.content);
                else reject(data.message || "undefined error occurred");
            });
        });
    }
}
