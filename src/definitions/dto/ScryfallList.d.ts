type ScryfallList<T> = {
    object: string,
    total_cards?: number,
    has_more: boolean,
    data: T[],
};

export default ScryfallList;
