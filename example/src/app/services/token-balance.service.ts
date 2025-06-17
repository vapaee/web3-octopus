// src/app/services/token-balance.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription, firstValueFrom } from 'rxjs';
import { SessionService } from '@app/services/session-kit.service';
import { TokenListService } from '@app/services/token-list.service';
import { Token, Balance } from '@app/types';
import { W3oContextFactory, W3oNetworkType } from '@vapaee/w3o-core';
import { Web3OctopusService } from './web3-octopus.service';
import { AntelopeTokensService } from '@vapaee/w3o-antelope';
import { EthereumTokensService } from '@vapaee/w3o-ethereum';

const logger = new W3oContextFactory('TokenBalanceService');

@Injectable({
    providedIn: 'root'
})
export class TokenBalanceService {
    private balances$ = new BehaviorSubject<Balance[]>([]);
    private serviceSub: Subscription | null = null;

    constructor(
        private sessionService: SessionService,
        private tokenListService: TokenListService,
        private w3o: Web3OctopusService,
    ) {
        combineLatest([this.sessionService.session$, this.tokenListService.tokens$])
            .subscribe(([session]) => {
                if (!session?.address) {
                    this.balances$.next([]);
                    this.unsubscribe();
                    return;
                }
                const svc = this.getServiceFor(session.network.type);
                this.subscribeToService(svc, session.authenticator);
                svc.updateAllBalances(session.authenticator, logger.method('updateAll', { network: session.network.name }));
            });
    }

    getAllBalances() {
        return this.balances$.asObservable();
    }

    async updateSingleBalance(token: Token) {
        const session = this.sessionService.current;
        if (!session) return;
        const svc = this.getServiceFor(session.network.type);
        if (svc instanceof AntelopeTokensService) {
            svc.updateSingleBalance(session.authenticator, token, logger.method('updateSingleBalance', { token: token.symbol }));
        } else {
            svc.updateAllBalances(session.authenticator, logger.method('updateSingleBalance', { token: token.symbol }));
        }
    }

    async updateAllBalances() {
        const session = this.sessionService.current;
        if (!session) return;
        const svc = this.getServiceFor(session.network.type);
        svc.updateAllBalances(session.authenticator, logger.method('updateAllBalances'));
    }

    waitUntilBalanceChanges(token: Token, delay = 1, maxSeconds = 10): Promise<Balance> {
        const session = this.sessionService.current;
        if (!session) return Promise.reject(new Error('No active session.'));
        const svc = this.getServiceFor(session.network.type);
        if (svc instanceof AntelopeTokensService) {
            return firstValueFrom(svc.waitUntilBalanceChanges(session.authenticator, token, delay, maxSeconds, logger.method('waitUntilBalanceChanges')));
        }
        return Promise.reject(new Error('waitUntilBalanceChanges not supported for this network'));
    }

    private getServiceFor(type: W3oNetworkType): AntelopeTokensService | EthereumTokensService {
        console.assert(!!this.w3o.octopus.services[type], `No service registered for network type: ${type}`);
        return this.w3o.octopus.services[type].tokens;
    }

    private subscribeToService(service: AntelopeTokensService | EthereumTokensService, auth: any) {
        this.unsubscribe();
        this.serviceSub = service
            .getBalances$(auth, logger.method('subscribeToService'))
            .subscribe(b => this.balances$.next(b));
    }

    private unsubscribe() {
        if (this.serviceSub) {
            this.serviceSub.unsubscribe();
            this.serviceSub = null;
        }
    }
}
