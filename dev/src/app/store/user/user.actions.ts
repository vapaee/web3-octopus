import { createAction, props } from '@ngrx/store';

const toggleTheme = createAction('[User Preferences] Toggle Theme');

const setHue0 = createAction(
    '[User Preferences] Set Hue',
    props<{ h0: number }>()
);

const setHue1 = createAction(
    '[User Preferences] Set Hue1',
    props<{ h1: number }>()
);

const setHueTheme = createAction(
    '[User Preferences] Set Hue Theme',
    props<{ h0: number; h1: number }>()
);

const setDark = createAction('[User Preferences] Set Dark Theme');
const setLight = createAction('[User Preferences] Set Light Theme');

export const actions = {
    toggleTheme,
    setHue0,
    setHue1,
    setHueTheme,
    setDark,
    setLight,
};
