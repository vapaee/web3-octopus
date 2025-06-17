// src/app/services/session-kit.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Web3OctopusService } from './web3-octopus.service';
import { W3oContextFactory, W3oSession } from '@vapaee/w3o-core';


const logger = new W3oContextFactory('SessionService');

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    // private sessionKit: SessionKit;
    private localStorageService = inject(LocalStorageService);

    session$!: Observable<W3oSession | null>;

    constructor(
        private w3o : Web3OctopusService, // inject the Web3Octopus instance
    ) {
        logger.method('constructor');
        this.session$ = this.w3o.octopus.sessions.current$;
        this.session$.subscribe((session: W3oSession | null) => {
            let user = null;
            if (session) {
                user = session.address.toString();
            }
            logger.debug('Session changed:', { user, session });
            setTimeout(() => {
                this.localStorageService.restoreUserPreferences(user);
            }, 10);
        });
    }

    // Returns the current w3oSession
    get current(): W3oSession | null {
        return this.w3o.octopus.sessions.current;
    }

    // Login method
    async login() {
        const context = logger.method('login');
        try {
            const network = this.w3o.octopus.networks.current;
            this.w3o.octopus.auth.login(network.name, network.type, context);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    // Logout method
    async logout() {
        const context = logger.method('logout');
        try {
            this.w3o.octopus.auth.logout(context);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }

    // Restore session method
    async restoreSession() {
        const context = logger.method('restoreSession');
        try {
            this.w3o.octopus.auth.autoLogin(context);
        } catch (error) {
            console.error('Error restoring session:', error);
            throw error;
        }

    }

    validateAccount(address: string): Observable<boolean> {
        const sender = this.current?.address;
        const context = logger.method('validateAccount', { sender });
        const network = this.w3o.octopus.networks.current;
        return network.validateAccount(address, context);
    }

}
