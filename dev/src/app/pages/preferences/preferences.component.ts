import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { user } from '@app/store/user';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToggleComponent } from '@app/components/base-components/toggle/toggle.component';
import { SharedModule } from '@app/shared/shared.module';
import { LucideAngularModule, Globe } from 'lucide-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-preferences',
    standalone: true,
    imports: [
        CommonModule,
        ToggleComponent,
        SharedModule,
        LucideAngularModule
    ],
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {
    readonly GlobeIcon = Globe

    hue0$: Observable<number>;
    hue1$: Observable<number>;
    currentState$: Observable<number>;

    // Subjects for debouncing
    private hue0Subject = new Subject<number>();
    private hue1Subject = new Subject<number>();
    private destroy$ = new Subject<void>(); // Cleanup subject

    constructor(
        private translate: TranslateService,
        private store: Store<AppState>
    ) {
        this.hue0$ = this.store.pipe(select(user.selectors.hue0));
        this.hue1$ = this.store.pipe(select(user.selectors.hue1));

        this.currentState$ = this.store.pipe(
            select(user.selectors.isDarkTheme),
            map((isDark) => (isDark ? 0 : 1)) // Dark = 0, Light = 1
        );
    }

    ngOnInit(): void {
        // Debounce hue0
        this.hue0Subject
            .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((h0) => {
                this.store.dispatch(user.actions.setHue0({ h0 }));
            });

        // Debounce hue1
        this.hue1Subject
            .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((h1) => {
                this.store.dispatch(user.actions.setHue1({ h1 }));
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onStateChange(newState: number) {
        switch (newState) {
            case 0:
                this.store.dispatch(user.actions.setDark());
                break;
            case 1:
                this.store.dispatch(user.actions.setLight());
                break;
        }
    }

    setLang( l: string ) {
        this.translate.use(l)
    }

    setHueTheme(theme: 'default' | 'igneous' | 'emerald') {
        let h0, h1;

        switch (theme) {
            case 'igneous':
                h0 = 40;
                h1 = 10;
                break;
            case 'emerald':
                h0 = 140;
                h1 = 170;
                break;
            default:
                h0 = 190;
                h1 = 220;
        }

        this.store.dispatch(user.actions.setHueTheme({ h0, h1 }));
    }
}
