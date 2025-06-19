import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-pool',
    imports: [SharedModule],
    template: `
        <div class="p-pool">
            <div class="p-pool__title">{{ 'PAGES.POOL.TITLE' | translate }}</div>
            <p class="p-pool__subtitle">{{ 'PAGES.POOL.DESCRIPTION' | translate }}</p>
        </div>
    `,
    styleUrls: ['./pool.component.scss']
})
export class PoolComponent {}
