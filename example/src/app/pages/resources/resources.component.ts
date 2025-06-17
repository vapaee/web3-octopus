import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesService } from '@app/services/resources.service';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Web3OctopusService } from '@app/services/web3-octopus.service';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';
import { SharedModule } from '@app/shared/shared.module';
import { BREAKPOINT } from '@app/types';
import { AntelopeResourcesState } from '@vapaee/w3o-antelope';

@Component({
    selector: 'app-resources',
    standalone: true,
    imports: [CommonModule, SharedModule, LucideAngularModule],
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {
    readonly RefreshIcon = RefreshCcw;

    state: AntelopeResourcesState | null = null;
    isMobileView = false;
    isAntelope = false;

    private destroy$ = new Subject<void>();

    constructor(
        private resourcesService: ResourcesService,
        private breakpointObserver: BreakpointObserver,
        private w3o: Web3OctopusService,
    ) {}

    ngOnInit() {
        this.breakpointObserver.observe(BREAKPOINT)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => this.isMobileView = result.matches);

        this.resourcesService.getResources$()
            .pipe(takeUntil(this.destroy$))
            .subscribe(state => this.state = state);

        this.w3o.octopus.networks.current$
            .pipe(takeUntil(this.destroy$))
            .subscribe(net => this.isAntelope = net.type === 'antelope');
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    refresh() {
        this.resourcesService.refresh();
    }

    stakeCpu() {
        const amount = parseFloat(prompt('CPU amount') || '0');
        if (amount > 0) this.resourcesService.stakeCpu(amount).subscribe();
    }

    unstakeCpu() {
        const amount = parseFloat(prompt('CPU amount') || '0');
        if (amount > 0) this.resourcesService.unstakeCpu(amount).subscribe();
    }

    stakeNet() {
        const amount = parseFloat(prompt('NET amount') || '0');
        if (amount > 0) this.resourcesService.stakeNet(amount).subscribe();
    }

    unstakeNet() {
        const amount = parseFloat(prompt('NET amount') || '0');
        if (amount > 0) this.resourcesService.unstakeNet(amount).subscribe();
    }

    buyRam() {
        const bytes = parseInt(prompt('RAM bytes') || '0', 10);
        if (bytes > 0) this.resourcesService.buyRam(bytes).subscribe();
    }

    sellRam() {
        const bytes = parseInt(prompt('RAM bytes') || '0', 10);
        if (bytes > 0) this.resourcesService.sellRam(bytes).subscribe();
    }
}
