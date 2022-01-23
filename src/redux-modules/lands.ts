import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
import Color from '../definitions/Color';
import Identity from '../definitions/Identity';
import NetworkStatus from '../definitions/NetworkStatus';
import { getBasicLandArt, getNonBasicLands } from '../lib/api/card';
import { fullCardToLand } from '../lib/translation/cardTranslations';
import { fetchCommanders } from './commander';

type BasicState = {
    count: number,
    artOptions: Card[],
    selectedArt: Card | null,
};

type NonBasicState = {
    options: Card[],
    lands: Card[],
}

export type LandState = {
    basics: Record<Color, BasicState>,
    nonbasics: NonBasicState,
    basicArtStatus: NetworkStatus,
    nonbasicStatus: NetworkStatus,
};

const initialBasicState: BasicState = {
    count: 0,
    artOptions: [],
    selectedArt: null,
};

const initialState: LandState = {
    basics: {
        [Color.WHITE]: {...initialBasicState},
        [Color.BLUE]: {...initialBasicState},
        [Color.BLACK]: {...initialBasicState},
        [Color.RED]: {...initialBasicState},
        [Color.GREEN]: {...initialBasicState},
    },
    nonbasics: {
        options: [],
        lands: [],
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
            if (state.nonbasics.lands.find(l => l.id === land.id)) {
                state.nonbasics.lands = state.nonbasics.lands.filter(l => l.id !== land.id);
            } else {
                state.nonbasics.lands.push(land);
            }
        },
        setBasicCount: (state, action: PayloadAction<{ color: Color, count: number }>) => {
            const { color, count } = action.payload;

            if (count < 0) {
                throw new Error('count cannot be negative');
            }

            state.basics[color].count = Math.floor(count);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommanders.pending, (state) => {
            state = {...initialState};
        }).addCase(fetchBasicLandArt.pending, (state) => {
            state.basicArtStatus = 'loading';
        }).addCase(fetchBasicLandArt.fulfilled, (state, action) => {
            const { color, response } = action.payload;
            state.basics[color].artOptions = response.data.map(fullCardToLand);
            state.basics[color].selectedArt = state.basics[color].artOptions[0];
            state.basicArtStatus = 'idle';
        }).addCase(fetchNonBasicLands.pending, (state) => {
            state.nonbasicStatus = 'loading';
        }).addCase(fetchNonBasicLands.fulfilled, (state, action) => {
            state.nonbasics.options = action.payload.data.map(fullCardToLand);
            console.log(state.nonbasics.options);
            state.nonbasicStatus = 'idle';
        });
    }
});

export default landSlice;

export const { toggleNonBasic, setBasicCount } = landSlice.actions;