import {BotArcApiDifficulty} from "./types";

export function botArcApiDifficulty2String(difficulty: BotArcApiDifficulty): string {
    return `${Math.floor(difficulty / 2)}${difficulty % 2 === 1 ? "+" : ""}`
}

export function botArcApiDifficulty2DifficultyClass(
    difficulty: BotArcApiDifficulty
): {rating: number, ratingPlus?: boolean} {
    const difficultyClass = {
        rating: Math.floor(difficulty / 2),
        ratingPlus: difficulty % 2 === 1 || undefined
    }
    return difficultyClass
}

export function difficultyClass2String (difficultyClass: {rating: number, ratingPlus?: boolean}): string {
    return `${difficultyClass.rating}${difficultyClass.ratingPlus ? "+" : ""}`
}

export function formatScore(score: number): string {
    let text = `${score}`;
    for (let i = text.length; i < 8; i++) text = '0' + text;
    let result = "";
    for (let i = text.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 === 0 && i !== 0) {
            result += text[i] + "'";
            continue;
        }
        result += text[i];
    }
    return result.split('').reverse().join("");
}
