import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommanderCard } from '../definitions/Card';
import Color from '../definitions/Color';
import Format from '../definitions/Format';
import NetworkStatus from '../definitions/NetworkStatus';
import { getCommander } from '../lib/api/card';

export type CommanderState = {
    options: CommanderCard[],
    commander: CommanderCard | null,
    status: NetworkStatus,
};

const initialState: CommanderState = {
    options: [],
    commander: null,
    status: 'idle',
};

// TODO: Thunks for loading commander
type CommanderParams = {
    format: Format,
    colors: Color[],
};

export const fetchCommanders = createAsyncThunk(
    'commander/fetchCommanders',
    async (params: CommanderParams) => {
        const { format, colors } = params;
        const response = await getCommander(format, colors);
        return response;
    }
);

const commanderSlice = createSlice({
    name: 'commander',
    initialState,
    reducers: {
        setCommander: (state, action: PayloadAction<CommanderCard>) => {
            state.commander = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommanders.pending, (state) => {
            state.options = [];
            state.commander = null;
            state.status = 'loading';
        }).addCase(fetchCommanders.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        })
    },
});


export default commanderSlice;
