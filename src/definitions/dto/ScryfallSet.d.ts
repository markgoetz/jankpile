type ScryfallSet = {
    id: string,
    code: string,
    mtgo_code: string,
    tcgplayer_id: number,
    name: string,
    set_type: string,
    released_at: string | null,
    block_code: string | null,
    block: string | null,
    parent_set_code: string | null,
    card_count: number,
    printed_size: number | null,
    digital: boolean,
    foil_only: boolean,
    nonfoil_only: boolean,
    scryfall_uri: string,
    uri: string,
    icon_svg_uri: string,
    search_uri: string,
};

export default ScryfallSet;
