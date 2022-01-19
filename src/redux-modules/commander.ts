import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
import Identity from '../definitions/Identity';
import NetworkStatus from '../definitions/NetworkStatus';
import { getCommander } from '../lib/api/card';
import { fullCardToCommander } from '../lib/translation/cardTranslations';
import { RootState } from './store';

export type CommanderState = {
    options: Card[],
    commander: Card | null,
    status: NetworkStatus,
};

const initialState: CommanderState = {
    options: [],
    commander: null,
    status: 'idle',
};

export const fetchCommanders = createAsyncThunk(
    'commander/fetchCommanders',
    async (identity: Identity) => {
        const response = await getCommander(identity);
        return response;
    }
);

const commanderSlice = createSlice({
    name: 'commander',
    initialState,
    reducers: {
        setCommander: (state, action: PayloadAction<Card>) => {
            state.commander = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommanders.pending, (state) => {
            state.options = [];
            state.commander = null;
            state.status = 'loading';
        }).addCase(fetchCommanders.fulfilled, (state, action) => {
            state.options = action.payload.data.map(fullCardToCommander);
            state.status = 'idle';
        })
    },
});

export const selectOptions = (state: RootState) => state.commander.options;
export const selectCommander = (state: RootState) => state.commander.commander;
export const selectStatus = (state: RootState) => state.commander.status;

export const { setCommander } = commanderSlice.actions;

export default commanderSlice;
