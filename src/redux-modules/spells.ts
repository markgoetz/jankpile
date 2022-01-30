import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
import Identity from '../definitions/Identity';
import NetworkStatus from '../definitions/NetworkStatus';
import { getSpells } from '../lib/api/card';
import { fullCardToSpell } from '../lib/translation/cardTranslations';
import { fetchCommanders } from './commander';
import { RootState } from './store';

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

// TODO: Add query and page
export type fetchSpellParams = {
    identity: Identity,
    query?: string,
    manaValues?: number[],
    page?: number,
};

export const fetchSpells = createAsyncThunk(
    'spells/fetchSpells',
    async (params: fetchSpellParams) => {
        const response = await getSpells(params);
        return response;
    }
);

const spellSlice = createSlice({
    name: 'spells',
    initialState,
    reducers: {
        toggleSpell: (state, action: PayloadAction<Card>) => {
            const spell = action.payload;
            if (state.spells.find(s => s.id === spell.id)) {
                state.spells = state.spells.filter(s => s.id !== spell.id);
            } else {
                state.spells.push(spell);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommanders.pending, (state) => {
            state.options = [];
            state.spells = [];
            state.page = 0;
        }).addCase(fetchSpells.pending, (state) => {
            state.options = [];
            state.status = 'loading';
            state.page = 0;
        }).addCase(fetchSpells.fulfilled, (state, action) => {
            state.options = action.payload.data.map(fullCardToSpell);
            state.status = 'idle';
        });
    }
});

export const selectSpellOptions = (state: RootState) => state.spells.options;
export const selectSpellStatus = (state: RootState) => state.spells.status;
export const selectSpellList = (state: RootState) => state.spells.spells;

export const { toggleSpell } = spellSlice.actions;

export default spellSlice;