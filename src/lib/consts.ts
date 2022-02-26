import Color from '../definitions/Color';
import Format from '../definitions/Format';

export const CARD_COUNT_BY_FORMAT: Record<Format, number> = {
    'historic': 100,
    'brawl': 60,
};

export const PLURAL_LAND_NAMES: Record<Color, string> = {
    [Color.WHITE]: 'Plains',
    [Color.BLUE]: 'Islands',
    [Color.BLACK]: 'Swamps',
    [Color.RED]: 'Mountains',
    [Color.GREEN]: 'Forests',
};

export const SINGULAR_LAND_NAMES: Record<Color, string> = {
    [Color.WHITE]: 'Plains',
    [Color.BLUE]: 'Island',
    [Color.BLACK]: 'Swamp',
    [Color.RED]: 'Mountain',
    [Color.GREEN]: 'Forest',
};

export const ENDPOINTS = {
    COMMANDER: '/api/commander',
    SPELLS: '/api/spells',
    NONBASICS: '/api/nonbasics',
    BASIC_ART: '/api/basics',
};

export const STOPWORD_LIST = [
    'a',
    'all',
    'an',
    'and',
    'and/or',
    'any',
    'are',
    'at',
    'by',
    'each',
    'for',
    'from',
    'has',
    'is',
    'it',
    'it\'s',
    'its',
    'may',
    'more',
    'of',
    'on',
    'one',
    'only',
    'or',
    'other',
    'that',
    'the',
    'their',
    'then',
    'they',
    'this',
    'to',
    'up',
    'was',
    'whenever',
    'who',
    'with',
    'you',
    'your',
];