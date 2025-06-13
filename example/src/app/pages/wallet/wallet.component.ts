import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenBalanceService } from '@app/services/token-balance.service';
import { SessionService } from '@app/services/session-kit.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Balance } from '@app/types';
import { ExpandableComponent } from '@app/components/base-components/expandable/expandable.component';
import { ExpandableGroupComponent } from '@app/components/base-components/expandable/expandable-group.component';
import { TokenTransferFormComponent } from '@app/components/token-transfer-form/token-transfer-form.component';
import { BREAKPOINT } from '@app/types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    selector: 'app-wallet',
    standalone: true,
    imports: [
        CommonModule,
        ExpandableComponent,
        ExpandableGroupComponent,
        TokenTransferFormComponent,
        SharedModule
    ],
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
    balances: Balance[] = [];
    loading = false;  // Add loading state
    isMobileView = false;
    private balanceSubscription!: Subscription;
    private destroy$ = new Subject<void>();

    constructor(
        private sessionService: SessionService,
        private tokenBalanceService: TokenBalanceService,
        private breakpointObserver: BreakpointObserver,
    ) {
    }

    get actor(): string | undefined {
        return this.sessionService.current?.address || undefined;
    }

    ngOnInit() {
        this.balanceSubscription = this.tokenBalanceService.getAllBalances().subscribe(balances => {
            this.balances = balances;
            this.loading = false;
        });
        // Detect viewport size
        this.breakpointObserver.observe(BREAKPOINT)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.isMobileView = result.matches;
            });
    }

    refreshBalances() {
        this.loading = true;
        this.tokenBalanceService.updateAllBalances();
    }

    ngOnDestroy() {
        if (this.balanceSubscription) this.balanceSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
