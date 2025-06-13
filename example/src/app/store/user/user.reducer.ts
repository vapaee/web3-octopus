import { createReducer, on } from '@ngrx/store';
import { actions } from './user.actions';

export interface UserState{
    isDarkTheme: boolean;
    h0: number;
    h1: number;
}

export const initialState: UserState = {
    isDarkTheme: true,
    h0: 170,
    h1: 220,
};

export const userReducer = createReducer(
    initialState,
    on(actions.toggleTheme, (state) => ({
        ...state,
        isDarkTheme: !state.isDarkTheme,
    })),
    on(actions.setDark, (state) => ({
        ...state,
        isDarkTheme: true,
    })),
    on(actions.setLight, (state) => ({
        ...state,
        isDarkTheme: false,
    })),
    on(actions.setHue0, (state, { h0 }) => ({
        ...state,
        h0,
    })),
    on(actions.setHue1, (state, { h1 }) => ({
        ...state,
        h1,
    })),
    on(actions.setHueTheme, (state, { h0, h1 }) => ({
        ...state,
        h0,
        h1,
    }))
);
