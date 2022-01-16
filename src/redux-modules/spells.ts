import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
import NetworkStatus from '../definitions/NetworkStatus';

export type SpellState = {
    options: Card[],
    page: number,
    spells: Card[],
    status: NetworkStatus,
};

const initialState: SpellState = {
    options: [],
    page: 0,
    spells: [],
    status: 'idle',
};

const spellSlice = createSlice({
    name: 'spells',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<NetworkStatus>) => {
            state.status = action.payload;
        },
        setOptions: (state, action: PayloadAction<Card[]>) => {
            state.options = action.payload;
        },
        toggleCard: (state, action: PayloadAction<Card>) => {
            if (state.spells.find(spell => spell.id === action.payload.id)) {
                state.spells = state.spells.filter(spell => spell.id !== action.payload.id);
            } else {
                state.spells.push(action.payload);
            }
        },
    },
    extraReducers: {
        // TODO: clear out spells when new search happens
    }
});

export default spellSlice;