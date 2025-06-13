// src/app/services/token-transfer.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
    W3oContextFactory,
    W3oTransferStatus,
    W3oToken,
} from '@vapaee/w3o-core';
import { Web3OctopusService } from './web3-octopus.service';
import { SessionService } from './session-kit.service';

const logger = new W3oContextFactory('TokenTransferService');

@Injectable({
    providedIn: 'root',
})
export class TokenTransferService {
    constructor(
        private w3o: Web3OctopusService,
    ) {

    }

    /**
     * Returns an observable of transfer status for the given token symbol
     * @param tokenSymbol The symbol of the token to track
     */
    public getTransferStatus$(tokenSymbol: string): Observable<W3oTransferStatus> {
        const context = logger.method('getTransferStatus$', { tokenSymbol });
        return this.w3o.octopus.services.tokens.getTransferStatus(tokenSymbol, context);
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
        this.w3o.octopus.services.tokens.resetTransferCycle(auth, tokenSymbol, context);
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
        this.w3o.octopus.services.tokens.resetAllTransfers(auth, context);
    }

    /**
     * Transfers tokens using the AntelopeTokensService
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
        await this.w3o.octopus.services.tokens.transferToken(auth, to, quantity, token, memo, context);
    }
}
