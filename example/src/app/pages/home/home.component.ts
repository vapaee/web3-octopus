// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [SharedModule],
    template: `
        <div class="p-home">
            <div class="p-home__title">{{ 'PAGES.HOME.TITLE' | translate }}</div>
            <p class="p-home__subtitle">{{ 'PAGES.HOME.DESCRIPTION' | translate }}</p>
        </div>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
