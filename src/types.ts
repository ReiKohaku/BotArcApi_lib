export enum ArcaeaDifficulty {
    past = 0,
    pst = 0,
    present = 1,
    prs = 1,
    future = 2,
    ftr = 2,
    beyond = 3,
    byd = 3
}

export enum ArcaeaClearType {
    fail,
    normal,
    full,
    pure,
    easy,
    hard
}

export enum ArcaeaGradeType {
    exp,
    ex,
    aa,
    a,
    b,
    c,
    d
}

export type BotArcApiDifficultyRange = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '9p' | '10' | '10p' | '11'
export type BotArcApiDifficulty = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export type BotArcApiRecent = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface BotArcApiScore {
    song_id: string
    difficulty: ArcaeaDifficulty
    score: number
    shiny_perfect_count: number
    perfect_count: number
    near_count: number
    miss_count: number
    clear_type: ArcaeaClearType
    best_clear_type: ArcaeaClearType
    health: number
    time_played: number
    modifier: number
    rating: number
}

export interface BotArcApiUserinfoV4 {
    user_id: number
    name: string
    recent_score?: BotArcApiScore[]
    character: number
    join_date: number
    rating: number
    is_skill_sealed: boolean
    is_char_uncapped: boolean
    is_char_uncapped_override: boolean
    is_mutual: boolean
}

export interface BotArcApiUserinfoV4 {
    user_id: number
    name: string
    recent_score?: BotArcApiScore[]
    character: number
    join_date: number
    rating: number
    is_skill_sealed: boolean
    is_char_uncapped: boolean
    is_char_uncapped_override: boolean
    is_mutual: boolean
    code: string
}

export interface BotArcApiUserbest30 {
    best30_avg: number
    recent10_avg: number
    best30_list: Array<BotArcApiScore>
    best30_overflow: Array<BotArcApiScore>
}

export interface BotArcApiDifficultyClass {
    ratingClass: ArcaeaDifficulty
    chartDesigner: string
    jacketDesigner: string
    jacket_night?: string
    jacketOverride?: boolean
    rating: number
    ratingPlus?: boolean
    ratingReal: number
    totalNotes: number
}

export interface BotArcApiSonginfo {
    id: string
    title_localized: {
        en: string
        ja?: string
        'zh-Hans'?: string
        'zh-Hant'?: string
    },
    artist: string
    bpm: string
    bpm_base: number
    set: string
    audioTimeSec: number
    side: 0 | 1
    remote_dl: boolean
    world_unlock: boolean
    date: number // 十位时间戳
    version: string
    difficulties: Array<BotArcApiDifficultyClass>
}

export interface BotArcApiRatingInfo {
    sid: string
    rating: number
    rating_class: ArcaeaDifficulty
    difficulty: BotArcApiDifficulty
}

export interface BotArcApiResponse<T> {
    status: number
    content?: T
}

export interface BotArcApiResponseV4<T> {
    status: number
    content?: T
    message?: string
}

export interface BotArcApiBatchRequest {
    id: number
    bind?: Record<string, string>
    endpoint: string
}

export interface BotArcApiBatchResponse<T> {
    id: number
    result: BotArcApiResponseV4<T>
}

/* -------- BotArcApi V5 -------- */

export interface BotArcApiUserinfoV5 {
    code: string
    user_id: number
    name: string
    character: number
    join_date: number
    rating: number
    is_skill_sealed: boolean
    is_char_uncapped: boolean
    is_char_uncapped_override: boolean
    is_mutual: boolean
}

export interface BotArcApiDifficultyInfoV5 {
    name_en: string
    name_jp: string
    artist: string
    bpm: string
    bpm_base: number
    set: string
    set_friendly: string
    time: number
    side: 0 | 1
    world_unlock: boolean
    remote_download: boolean
    bg: string
    date: number // 十位时间戳
    version: string
    difficulty: BotArcApiDifficulty
    rating: number
    note: number
    chart_designer: string
    jacket_designer: string
    jacket_override: boolean
    audio_override: boolean
}

export interface BotArcApiRandomSong {
    id: string
    ratingClass?: number
    songinfo: BotArcApiDifficultyInfoV5[]
}

export namespace BotArcApiContentV5 {
    export namespace User {
        export interface Info {
            account_info: BotArcApiUserinfoV5,
            recent_score: BotArcApiScore[],
            songinfo: BotArcApiDifficultyInfoV5[]
        }

        export interface Best {
            account_info: BotArcApiUserinfoV5,
            record: BotArcApiScore,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            songinfo: BotArcApiDifficultyInfoV5[]
        }

        export interface Best30 {
            best30_avg: number
            recent10_avg: number
            account_info: BotArcApiUserinfoV5
            best30_list: BotArcApiScore[]      // length: 30
            best30_overflow: BotArcApiScore[]  // length: 10
            best30_songinfo: BotArcApiDifficultyInfoV5[][]          // length: 30
            best30_overflow_songinfo: BotArcApiDifficultyInfoV5[][] // length: 10
            recent_score: BotArcApiScore
            recent_songinfo: BotArcApiDifficultyInfoV5[]
        }
    }

    export namespace Song {
        export interface Random extends BotArcApiRandomSong {}
    }
}
