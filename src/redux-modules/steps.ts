import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum Step {
    IDENTITY,
    COMMANDER,
    SPELLS,
    LANDS,
};

export type StepState = {
    step: Step;
}

const initialState: StepState = {
    step: Step.IDENTITY,
};

const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.step === Step.LANDS) {
                throw new Error('No step after LANDS');
            }

            state.step = state.step + 1;
        },
        jumpToCommander: (state) => {
            state.step = Step.COMMANDER;
        },
        jumpToSpells: (state) => {
            state.step = Step.SPELLS;
        }
    }
});

export const selectStep = (state: RootState) => state.steps.step;
export const selectIsIdentity = (state: RootState) => state.steps.step === Step.IDENTITY;
export const selectIsCommander = (state: RootState) => state.steps.step === Step.COMMANDER;
export const selectIsSpells = (state: RootState) => state.steps.step === Step.SPELLS;
export const selectIsLands = (state: RootState) => state.steps.step === Step.LANDS;

export const selectIsAfterCommander = (state: RootState) => state.steps.step > Step.COMMANDER;
export const selectIsAfterSpells = (state: RootState) => state.steps.step > Step.SPELLS;

export const { nextStep, jumpToCommander, jumpToSpells } = stepSlice.actions;

export default stepSlice;
