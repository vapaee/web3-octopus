// src/app/services/token-transfer.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, firstValueFrom } from 'rxjs';
import {
    W3oContextFactory,
    W3oTransferStatus,
    W3oToken,
    W3oNetworkType,
} from '@vapaee/w3o-core';
import { Web3OctopusService } from './web3-octopus.service';
import { AntelopeTokensService } from '@vapaee/w3o-antelope';
import { EthereumTokensService } from '@vapaee/w3o-ethereum';

const logger = new W3oContextFactory('TokenTransferService');

@Injectable({
    providedIn: 'root',
})
export class TokenTransferService {
    constructor(
        private w3o: Web3OctopusService,
    ) {

    }

    private getServiceFor(type: W3oNetworkType): AntelopeTokensService | EthereumTokensService {
        console.assert(!!this.w3o.octopus.services[type], `No service registered for network type: ${type}`);
        return this.w3o.octopus.services[type].tokens;
    }

    /**
     * Returns an observable of transfer status for the given token symbol
     * @param tokenSymbol The symbol of the token to track
     */
    public getTransferStatus$(tokenSymbol: string): Observable<W3oTransferStatus> {
        const context = logger.method('getTransferStatus$', { tokenSymbol });
        const session = this.w3o.octopus.sessions.current;
        if (!session) {
            context.error('No active session');
            return of({ state: 'none' } as W3oTransferStatus);
        }
        const svc = this.getServiceFor(session.network.type);
        if (svc instanceof AntelopeTokensService || svc instanceof EthereumTokensService) {
            return svc.getTransferStatus(tokenSymbol, context);
        }
        return of({ state: 'none' } as W3oTransferStatus);
    }

    /**
     * Resets the transfer cycle for the given token symbol
     * @param tokenSymbol The symbol of the token to reset
     */
    public resetTransferCycle(tokenSymbol: string): void {
        const context = logger.method('resetTransferCycle', { tokenSymbol });
        const auth = this.w3o.octopus.sessions.current?.authenticator;
        if (!auth) {
            context.error('No active session');
            return;
        }
        const svc = this.getServiceFor(auth.network.type);
        if (svc instanceof AntelopeTokensService || svc instanceof EthereumTokensService) {
            svc.resetTransferCycle(auth, tokenSymbol, context);
        }
    }

    /**
     * Resets transfer cycles for all tokens
     */
    public resetAllTransfers(): void {
        const context = logger.method('resetAllTransfers');
        const auth = this.w3o.octopus.sessions.current?.authenticator;
        if (!auth) {
            context.error('No active session');
            return;
        }
        const svc = this.getServiceFor(auth.network.type);
        if (svc instanceof AntelopeTokensService || svc instanceof EthereumTokensService) {
            svc.resetAllTransfers(auth, context);
        }
    }

    /**
     * Transfers tokens using the underlying network service
     * @param to Recipient account
     * @param quantity Quantity string (e.g. '1.0000 TLOS')
     * @param token W3oToken object
     * @param memo Memo string
     */
    public async transferToken(
        to: string,
        quantity: string,
        token: W3oToken,
        memo: string = '',
    ): Promise<void> {
        const context = logger.method('transferToken', { to, quantity, token, memo });
        const auth = this.w3o.octopus.sessions.current?.authenticator;
        if (!auth) {
            context.error('No active session');
            return;
        }
        const svc = this.getServiceFor(auth.network.type);
        await firstValueFrom(svc.transferToken(auth, to, quantity, token, memo, context));
    }

    public getExplorerTxUrl(tx: string): string {
        const network = this.w3o.octopus.networks.current;
        const base = network.settings.links.explorer;
        if (!base) return '';
        if (network.type === 'ethereum') {
            return `${base}/tx/${tx}`;
        }
        return `${base}/transaction/${tx}`;
    }
}
