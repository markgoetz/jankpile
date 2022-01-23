import Card from '../../definitions/Card';
import Color from '../../definitions/Color';

const colorMatchers = {
    [Color.WHITE]: new RegExp(`{${Color.WHITE}}`, 'g'),
    [Color.BLUE]: new RegExp(`{${Color.BLUE}}`, 'g'),
    [Color.BLACK]: new RegExp(`{${Color.BLACK}}`, 'g'),
    [Color.RED]: new RegExp(`{${Color.RED}}`, 'g'),
    [Color.GREEN]: new RegExp(`{${Color.GREEN}}`, 'g'),
};

const getPipCounts = (cards: Card[]) => {
    const pipCounts = {
        [Color.WHITE]: 0,
        [Color.BLUE]: 0,
        [Color.BLACK]: 0,
        [Color.RED]: 0,
        [Color.GREEN]: 0,
    };

    return cards.reduce(
        (prevPips, card) => {
            Object.entries(colorMatchers).forEach(
                ([color, matcher]) => {
                    const matches = card.pips.match(matcher);
                    if (matches != null) {
                        pipCounts[color as Color] += matches.length;
                    }
                }
            );

            return pipCounts;
        },
        pipCounts
    );
};

export default getPipCounts;