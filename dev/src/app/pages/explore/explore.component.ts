// src/app/pages/explore/explore.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-explore',
    imports: [SharedModule],
    template: `
        <div class="p-explore">
            <div class="p-explore__title">{{ 'PAGES.EXPLORE.TITLE' | translate }}</div>
            <p class="p-explore__subtitle">{{ 'PAGES.EXPLORE.DESCRIPTION' | translate }}</p>
        </div>
    `,
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {}
