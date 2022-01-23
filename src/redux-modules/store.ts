import { configureStore } from '@reduxjs/toolkit';
import Card from '../definitions/Card';
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

export const selectAllCards = (state: RootState) => {
    const cards: Card[] = state.commander.commander != null
        ? [state.commander.commander]
        : [];
    
    cards.push(...state.spells.spells);

    Object.values(state.lands.basics).forEach(colorState => {
        if (colorState.selectedArt == null && colorState.count > 0) {
            throw new Error('selected art is null');
        }

        const basics = Array.from({ length: colorState.count }).fill(colorState.selectedArt) as Card[];
        cards.push(...basics);
    });
    cards.push(...state.lands.nonbasics.lands);

    return cards;
};
