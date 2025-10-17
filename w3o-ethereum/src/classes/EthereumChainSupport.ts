import { Observable } from 'rxjs';
import {
    W3oContext,
    W3oContextFactory,
    W3oChainSupport,
    W3oNetworkType,
    W3oInstance,
    W3oModule,
    W3oTransactionResponse,
    W3oNetworkName,
    W3oContract,
    W3oWallet,
    W3oTokenData,
    W3oToken,
} from '@vapaee/w3o-core';
import { ethers } from 'ethers';
import { ERC20ABI } from '../types';
import { EthereumContract } from './EthereumContract';

const logger = new W3oContextFactory('EthereumChainSupport');

export class EthereumTransactionResponse extends W3oTransactionResponse {
    constructor(hash: string) { super(hash); }
    wait(): Observable<any> { return new Observable(o => { o.next({}); o.complete(); }); }
}

export class EthereumChainSupport extends W3oChainSupport {

    constructor(
        parent: W3oContext,
        wallets: W3oWallet[],
    ) {
        const context = logger.method('constructor', parent);
        super('ethereum' as W3oNetworkType, wallets, context);
    }

    override get w3oVersion(): string { return '1.0.0'; }
    override get w3oName(): string { return 'ethereum.chain.support'; }
    override get w3oRequire(): string[] { return []; }

    override init(octopus: W3oInstance, requirements: W3oModule[], parent: W3oContext): void {
        const context = logger.method('init', { octopus, requirements }, parent);
        super.init(octopus, requirements, context);
        logger.info('EthereumChainSupport OK!', this.w3oId);
    }

    override createToken(data: W3oTokenData, parent: W3oContext): W3oToken {
        const context = logger.method('createToken', { data }, parent);
        const token = new W3oToken(data, new EthereumContract(
            data.address,
            data.name ?? 'ERC20',
            ERC20ABI,
            context
        ));
        return token;
    }

    override queryContract(networkName: W3oNetworkName, params: { [key: string]: any }, parent: W3oContext): Observable<any> {
        const context = logger.method('queryContract', { networkName, params }, parent);
        context.error('queryContract not implemented');
        return new Observable<any>();
    }

    override validateAccount(username: string, parent: W3oContext): Observable<boolean> {
        const context = logger.method('validateAccount', { username }, parent);
        const isValid = ethers.isAddress(username);
        return new Observable<boolean>(observer => { observer.next(isValid); observer.complete(); });
    }

    override fetchContract(address: string, parent: W3oContext): Observable<W3oContract | null> {
        const context = logger.method('fetchContract', { address }, parent);
        context.error('fetchContract not implemented');
        return new Observable<W3oContract | null>();
    }
}
