// src/app/core/store/app.state.ts

import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';
import { UserEffects } from './user/user.effects';
// Import additional state interfaces here as you create them
// import { WalletState } from './wallet/wallet.reducer';
// import { DataState } from './data/data.reducer';
// ... other imports

export interface AppState {
    user: UserState;
    // wallet: WalletState;
    // data: DataState;
    // ... other state slices
}

export const AppEffects = [
    UserEffects,
    // WalletEffects,
    // DataEffects,
    // ... other effects
];

export const AppReducers: ActionReducerMap<AppState> = {
    user: userReducer,
    // wallet: walletReducer,
    // data: dataReducer,
    // ... other reducers
};
