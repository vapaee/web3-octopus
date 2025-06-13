import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const selectUserState = createFeatureSelector<UserState>('user');

const isDarkTheme = createSelector(
    selectUserState,
    (state: UserState) => state.isDarkTheme
);


const hue0 = createSelector(
    selectUserState,
    (state: UserState) => state.h0
);

const hue1 = createSelector(
    selectUserState,
    (state: UserState) => state.h1
);

export const selectors = {
    isDarkTheme,
    hue0,
    hue1,
};
