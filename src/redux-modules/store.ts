import { configureStore } from '@reduxjs/toolkit';
import { CARD_COUNT_BY_FORMAT } from '../lib/consts';
import commanderSlice from './commander';
import identitySlice from './identity';
import landSlice from './lands';
import spellSlice from './spells';
import stepSlice from './steps';

const store = configureStore({
    reducer: {
        steps: stepSlice.reducer,
        identity: identitySlice.reducer,
        commander: commanderSlice.reducer,
        spells: spellSlice.reducer,
        lands: landSlice.reducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectTotalCardCount = (state: RootState) => {
    const commanderCount = state.commander != null ? 1 : 0;
    const spellCount = state.spells.spells.length;
    const nonBasicLandsCount = state.lands.options.length;
    const basicLandsCount = Object.values(state.lands.basics).reduce((prev, current) => prev + current, 0);

    return commanderCount + spellCount + nonBasicLandsCount + basicLandsCount;
};

export const selectIsDeckComplete = (state: RootState) => {
    const totalCount = selectTotalCardCount(state);
    const format = state.identity.format;

    return totalCount === CARD_COUNT_BY_FORMAT[format];
};
