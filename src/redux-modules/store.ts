import { configureStore } from '@reduxjs/toolkit';
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
    const commanderCount = state.commander.commander != null ? 1 : 0;
    console.log(commanderCount, state.commander.commander);

    const spellCount = state.spells.spells.length;
    const nonBasicLandsCount = state.lands.nonbasics.length;
    const basicLandsCount = Object.values(state.lands.basics).reduce((prev, current) => prev + current, 0);

    return commanderCount + spellCount + nonBasicLandsCount + basicLandsCount;
};
