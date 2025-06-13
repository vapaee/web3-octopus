// src/app/services/local-storage.service.ts
import { Injectable, inject } from '@angular/core';
import { UserState } from '@app/store/user/user.reducer';
import { Store } from '@ngrx/store';
import { user } from '@app/store/user';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private store = inject(Store);

    // Generic low-level methods
    save(key: string, content: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(content));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }
    get<T = unknown>(key: string, fallback: T | null = null): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : fallback;
        } catch (e) {
            console.error('Error reading from localStorage', e);
            return fallback;
        }
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }

    // High-level convenience methods for preferences
    saveUserPreferences(actor: string | null, userState: UserState) {
        let key = 'preference-anonymuos';
        if (actor) {
            key = `preference-${actor}`;
        }
        this.save(key, userState);
    }

    restoreUserPreferences(actor: string | null) {
        let key = 'preference-anonymuos';
        if (actor) {
            key = `preference-${actor}`;
        }
        const preferences = this.get<UserState>(key, null);
        if (preferences) {
            if (preferences.isDarkTheme) {
                this.store.dispatch(user.actions.setDark());
            } else {
                this.store.dispatch(user.actions.setLight());
            }
            if (typeof preferences.h0 === 'number' && typeof preferences.h1 === 'number') {
                this.store.dispatch(user.actions.setHueTheme({ h0: preferences.h0, h1: preferences.h1 }));
            }
        }
    }
}
