import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
import Color from '../definitions/Color';
import Identity from '../definitions/Identity';
import NetworkStatus from '../definitions/NetworkStatus';
import { getBasicLandArt, getNonBasicLands } from '../lib/api/card';
import { fullCardToLand } from '../lib/translation/cardTranslations';
import { fetchCommanders } from './commander';

export type LandState = {
    options: Card[],
    basics: Record<Color, number>;
    nonbasics: Card[],
    basicArt: Record<Color, Card[]>;
    basicArtStatus: NetworkStatus,
    nonbasicStatus: NetworkStatus,
};

const initialBasicLandMap = {
    [Color.WHITE]: 0,
    [Color.BLUE]: 0,
    [Color.BLACK]: 0,
    [Color.RED]: 0,
    [Color.GREEN]: 0,
};

const initialState: LandState = {
    options: [],
    basics: {...initialBasicLandMap},
    nonbasics: [],
    basicArt: {
        [Color.WHITE]: [],
        [Color.BLUE]: [],
        [Color.BLACK]: [],
        [Color.RED]: [],
        [Color.GREEN]: [],
    },
    basicArtStatus: 'idle',
    nonbasicStatus: 'idle',
};

type FetchBasicLandArtParams = {
    color: Color,
    isSnow: boolean,
};

export const fetchBasicLandArt = createAsyncThunk(
    'spells/fetchBasicLandArt',
    async (params: FetchBasicLandArtParams) => {
        const { color, isSnow } = params;
        const response = await getBasicLandArt(color, isSnow);
        return { color, response };
    }
);

export const fetchNonBasicLands = createAsyncThunk(
    'spells/fetchNonBasicLands',
    async (identity: Identity) => {
        const { colors, format } = identity;
        const response = await getNonBasicLands(colors, format);
        return response;
    }
);

const landSlice = createSlice({
    name: 'lands',
    initialState,
    reducers: {
        toggleNonBasic: (state, action: PayloadAction<Card>) => {
            const land = action.payload;
            if (state.nonbasics.find(l => l.id === land.id)) {
                state.nonbasics = state.nonbasics.filter(l => l.id !== land.id);
            } else {
                state.nonbasics.push(land);
            }
        },
        setBasicCount: (state, action: PayloadAction<{ color: Color, count: number }>) => {
            const { color, count } = action.payload;
            state.basics[color] = count;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommanders.pending, (state) => {
            state.options = [];
            state.basics = {...initialBasicLandMap};
            state.nonbasics = [];
        }).addCase(fetchBasicLandArt.pending, (state) => {
            state.basicArtStatus = 'loading';
        }).addCase(fetchBasicLandArt.fulfilled, (state, action) => {
            state.basicArt[action.payload.color] = action.payload.response.data.map(fullCardToLand);
            state.basicArtStatus = 'idle';
        }).addCase(fetchNonBasicLands.pending, (state) => {
            state.nonbasicStatus = 'loading';
        }).addCase(fetchNonBasicLands.fulfilled, (state, action) => {
            state.options = action.payload.data.map(fullCardToLand);
            console.log(state.options);
            state.nonbasicStatus = 'idle';
        });
    }
});

export default landSlice;
