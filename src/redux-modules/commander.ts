import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommanderCard } from '../definitions/Card';
import NetworkStatus from '../definitions/NetworkStatus';

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

const commanderSlice = createSlice({
    name: 'commander',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<NetworkStatus>) => {
            state.status = action.payload;
        },
        setCommander: (state, action: PayloadAction<CommanderCard>) => {
            state.commander = action.payload;
        },
        clearCommander: (state) => {
            state.commander = null;
        },
    },
});

// TODO: Thunks for loading commander

export default commanderSlice;
