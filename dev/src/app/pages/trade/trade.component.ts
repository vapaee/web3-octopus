import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-trade',
    imports: [SharedModule],
    template: `
        <div class="p-trade">
            <div class="p-trade__title">{{ 'PAGES.TRADE.TITLE' | translate }}</div>
            <p class="p-trade__subtitle">{{ 'PAGES.TRADE.DESCRIPTION' | translate }}</p>
        </div>
    `,
    styleUrls: ['./trade.component.scss']
})
export class TradeComponent {}
