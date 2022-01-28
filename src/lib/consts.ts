import Color from '../definitions/Color';
import Format from '../definitions/Format';

export const CARD_COUNT_BY_FORMAT: Record<Format, number> = {
    'historic': 100,
    'brawl': 60,
};

export const LAND_NAMES_BY_COLOR: Record<Color, string> = {
    [Color.WHITE]: 'Plains',
    [Color.BLUE]: 'Islands',
    [Color.BLACK]: 'Swamps',
    [Color.RED]: 'Mountains',
    [Color.GREEN]: 'Forests',
};
