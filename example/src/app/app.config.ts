// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule} from '@ngrx/effects';
import { AppEffects, AppReducers } from './store/app.state';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function to create TranslateHttpLoader
export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/locals/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            StoreModule.forRoot(
                AppReducers,
                {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true,
                    },
                }
            ),
            StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: false // Set to false since environment is not defined
            }),
            EffectsModule.forRoot(AppEffects),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [HttpClient]
                }
            })
        ),
    ],
};
