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

export interface BotArcApiUserinfo {
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

export interface BotArcApiUserbest30 {
    best30_avg: number
    recent10_avg: number
    best30_list: Array<BotArcApiScore>
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
    data: number // 十位时间戳
    difficulties: Array<BotArcApiDifficultyClass>
}

export interface BotArcApiRatingInfo {
    sid: string
    rating: number
    rating_class: ArcaeaDifficulty
    difficulty: BotArcApiDifficulty
}

export interface BotArcApiResponse {
    status: number
    content?: unknown
}

export interface BotArcApiResponseV4 {
    status: number
    content?: unknown
    message?: string
}

export interface BotArcApiBatchRequest {
    id: number
    bind?: Record<string, string>
    endpoint: string
}

export interface BotArcApiBatchResponse {
    id: number
    result: BotArcApiResponseV4
}
