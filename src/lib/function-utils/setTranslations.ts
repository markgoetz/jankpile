import ScryfallList from "../../definitions/dto/ScryfallList";
import ScryfallSet from '../../definitions/dto/ScryfallSet';

export const setListToNameMap = (list: ScryfallList<ScryfallSet>): Record<string, string> => {
    return list.data.reduce(
        (prev: Record<string, string>, current: ScryfallSet) => {
            return {
                ...prev,
                [current.code.toUpperCase()]: current.name,
            };
        },
        {} as Record<string, string>,
    );
};
