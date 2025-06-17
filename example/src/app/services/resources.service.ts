import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Web3OctopusService } from './web3-octopus.service';
import { SessionService } from './session-kit.service';
import { AntelopeResourcesState } from '@vapaee/w3o-antelope';
import { W3oContextFactory } from '@vapaee/w3o-core';

const logger = new W3oContextFactory('ResourcesService');

@Injectable({
    providedIn: 'root'
})
export class ResourcesService {
    private state$ = new BehaviorSubject<AntelopeResourcesState | null>(null);
    private sub?: Subscription;

    constructor(
        private w3o: Web3OctopusService,
        private sessionService: SessionService
    ) {
        this.sessionService.session$.subscribe(session => {
            const context = logger.method('sessionChange');
            this.sub?.unsubscribe();
            const network = session.network;
            if (session?.authenticator && network.type === 'antelope') {
                this.sub = this.w3o.octopus.services.antelope.resources
                    .getResources$(session.authenticator, context)
                    .subscribe(state => this.state$.next(state));
            } else {
                this.state$.next(null);
            }
        });
    }

    getResources$() {
        return this.state$.asObservable();
    }

    refresh() {
        const context = logger.method('refresh');
        const auth = this.sessionService.current?.authenticator;
        if (auth && this.w3o.octopus.networks.current.type === 'antelope') {
            this.w3o.octopus.services.antelope.resources.updateResources(auth, context);
        }
    }

    stakeCpu(amount: number) { return this.w3o.octopus.services.antelope.resources.stakeCpu(amount); }
    unstakeCpu(amount: number) { return this.w3o.octopus.services.antelope.resources.unstakeCpu(amount); }
    stakeNet(amount: number) { return this.w3o.octopus.services.antelope.resources.stakeNet(amount); }
    unstakeNet(amount: number) { return this.w3o.octopus.services.antelope.resources.unstakeNet(amount); }
    buyRam(bytes: number) { return this.w3o.octopus.services.antelope.resources.buyRam(bytes); }
    sellRam(bytes: number) { return this.w3o.octopus.services.antelope.resources.sellRam(bytes); }
}
