# ToggleComponent Usage Guide

## Overview
The `ToggleComponent` is a reusable Angular component that allows toggling between multiple projected states. It highlights the currently active state and emits a `stateChange` event that the parent component can use.

---

## Installation
Ensure the `ToggleComponent` is available in your standalone project and imported correctly.

```typescript
import { ToggleComponent } from './components/toggle.component';
```

---

## Usage

### Basic Example
Use `ng-template` with `#stateContent` to define multiple toggle states.

```html
<app-toggle (stateChange)="onStateChange($event)">
    <ng-template #stateContent>
        <p>Dark Mode</p>
    </ng-template>
    <ng-template #stateContent>
        <p>Light Mode</p>
    </ng-template>
</app-toggle>
```

### Handling State Changes
Capture the emitted state index in the parent component.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1>Current State = {{ currentState }}</h1>
        <app-toggle (stateChange)="onStateChange($event)">
            <ng-template #stateContent>
                <p>State 0</p>
            </ng-template>
            <ng-template #stateContent>
                <p>State 1</p>
            </ng-template>
        </app-toggle>
    `,
})
export class AppComponent {
    currentState = 0;

    onStateChange(newState: number) {
        this.currentState = newState;
    }
}
```

---

## API

### Inputs
- `@Input() currentState: number` (optional) - Sets the initial state.

### Outputs
- `@Output() stateChange: EventEmitter<number>` - Emits the current state index when toggled.

---

## Example: Binding with Store
To keep the toggle in sync with an NgRx store, use an observable.

```typescript
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@app/store/app.state';
import { user } from '@app/store/user';

@Component({
    selector: 'app-user-preferences',
    template: `
        <h1>Current State = {{ currentState$ | async }}</h1>
        <app-toggle [currentState]="currentState$ | async" (stateChange)="onStateChange($event)">
            <ng-template #stateContent>
                <p>Dark</p>
            </ng-template>
            <ng-template #stateContent>
                <p>Light</p>
            </ng-template>
            <ng-template #stateContent>
                <p>None</p>
            </ng-template>
        </app-toggle>
    `,
})
export class UserPreferencesComponent {
    currentState$: Observable<number>;

    constructor(private store: Store<AppState>) {
        this.currentState$ = this.store.pipe(
            select(user.selectors.isDarkTheme),
            map((isDark) => (isDark === null ? 2 : isDark ? 0 : 1))
        );
    }

    onStateChange(newState: number) {
        switch (newState) {
            case 0:
                this.store.dispatch(user.actions.setDark());
                break;
            case 1:
                this.store.dispatch(user.actions.setLight());
                break;
            case 2:
                this.store.dispatch(user.actions.setNone());
                break;
        }
    }
}
```

This ensures the toggle state remains synchronized with the store and updates dynamically. 🚀

