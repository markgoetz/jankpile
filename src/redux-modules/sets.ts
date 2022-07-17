import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSetNames } from '../lib/api/set';
import { RootState } from './store';

export type SetState = {
    setNames: Record<string, string>,
};

const initialState: SetState = {
    setNames: {},
};

export const fetchSetNames = createAsyncThunk(
    'sets/fetchSetNames',
    async () => {
        const response = await getSetNames();
        return response;
    }
);

const setSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        setSetNames: (state, action: PayloadAction<Record<string, string>>) => {
            state.setNames = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSetNames.pending, (state) => {
            state.setNames = {};
        }).addCase(fetchSetNames.fulfilled, (state, action) => {
            state.setNames = action.payload;
        });
    },
});
export default setSlice;

export const { setSetNames } = setSlice.actions;

export const selectSetNames = (state: RootState) => state.sets.setNames;
