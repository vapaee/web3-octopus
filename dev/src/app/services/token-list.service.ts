// src/app/services/session-kit.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3OctopusService } from './web3-octopus.service';
import { W3oToken } from '@vapaee/w3o-core';

@Injectable({
    providedIn: 'root'
})
export class TokenListService {
    // private tokens$ = new BehaviorSubject<Token[]>([]);

    constructor(
        private octopus: Web3OctopusService,
    ) {
        // this.loadTokenList();
    }

    get tokens$(): Observable<W3oToken[]> {
        return this.octopus.octopus.networks.current.tokens$;
    }

    getTokens() {
        return this.tokens$;
    }

    getTokensValue(): W3oToken[] {
        let value: W3oToken[] = [];
        this.tokens$.subscribe((tokens) => {
            value = tokens;
        });
        return value;
    }
}
