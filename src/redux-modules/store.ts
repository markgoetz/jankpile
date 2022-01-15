import { configureStore } from '@reduxjs/toolkit';
import commanderSlice from './commander';
import identitySlice from './identity';
import spellSlice from './spells';

const store = configureStore({
    reducer: {
        identity: identitySlice.reducer,
        commander: commanderSlice.reducer,
        spells: spellSlice.reducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
