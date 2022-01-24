import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../definitions/Color';
import Format from '../definitions/Format';
import Identity from '../definitions/Identity';
import { RootState } from './store';

export type IdentityState = {
    format: Format,
    colors: Record<Color, boolean>;
};

const initialState: IdentityState = {
    format: 'brawl',
    colors: {
        [Color.WHITE]: false,
        [Color.BLUE]: false,
        [Color.BLACK]: false,
        [Color.RED]: false,
        [Color.GREEN]: false,
    },
};

const identitySlice = createSlice({
    name: 'identity',
    initialState,
    reducers: {
        setIdentity: (state, action: PayloadAction<Identity>) => {
            const identity = action.payload;
            
            state.format = identity.format;
            Object.keys(state.colors).forEach(
                key => { state.colors[key as Color] = identity.colors.includes(key as Color); }
            );
        },
    },
});

export const { setIdentity } = identitySlice.actions;
export default identitySlice;

export const selectFormat = (state: RootState) => state.identity.format;
export const isColorSelected = (state: RootState, color: Color) => state.identity.colors[color];
export const selectColors = (state: RootState) => {
    return Object.entries(state.identity.colors)
        .filter(entry => entry[1] === true)
        .map(entry => entry[0] as Color);
};
