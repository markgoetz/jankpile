import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../definitions/Color';
import Format from '../definitions/Format';
import { RootState } from './store';

export type IdentityState = {
    format: Format,
    colors: Record<Color, boolean>;
};

const initialState: IdentityState = {
    format: 'brawl',
    colors: { 'B': false, 'G': false, 'R': false, 'U': false, 'W': false },
};

const identitySlice = createSlice({
    name: 'identity',
    initialState,
    reducers: {
        setFormat: (state, action: PayloadAction<Format>) => {
            state.format = action.payload;
        },
        setFormatToHistoric: (state) => {
            state.format = 'historic';
        },
        toggleColor: (state, action: PayloadAction<Color>) => {
            state.colors[action.payload] = !state.colors[action.payload];
        }
    },
});

export const { setFormat, toggleColor } = identitySlice.actions;
export default identitySlice;
export const selectFormat = (state: RootState) => state.identity.format;
export const isColorSelected = (state: RootState, color: Color) => state.identity.colors[color];
export const selectColors = (state: RootState) => {
    return Object.entries(state.identity.colors)
        .filter(entry => entry[1] === true)
        .map(entry => entry[0] as Color);
};
