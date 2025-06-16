import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '@app/services/session-kit.service';
import { Web3OctopusService } from '@app/services/web3-octopus.service';
import { RedirectService } from '@app/services/redirect.service';
import { SharedModule } from '@app/shared/shared.module';
import { W3oContextFactory, W3oNetwork, W3oSession } from '@vapaee/w3o-core';
import { LucideAngularModule, X } from 'lucide-angular';

const logger = new W3oContextFactory('AccountsComponent');

@Component({
    selector: 'app-accounts',
    standalone: true,
    imports: [
        SharedModule,
        FormsModule,
        LucideAngularModule,
    ],
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
    readonly XIcon = X;
    networks = this.w3o.octopus.networks.list;
    selectedNetwork = this.w3o.octopus.networks.current.name;

    constructor(
        public sessionService: SessionService,
        private w3o: Web3OctopusService,
        private redirect: RedirectService,
    ) {
        w3o.octopus.networks.current$.subscribe((network: W3oNetwork) => {
            console.log('Current network changed:', network);
            this.selectedNetwork = network.name;
        });
    }

    ngOnInit() {
        this.redirect.disable();
    }

    ngOnDestroy() {
        this.redirect.enable();
    }

    get sessions(): W3oSession[] {
        return this.w3o.octopus.sessions.list;
    }

    changeNetwork(name: string) {
        const context = logger.method('changeNetwork');
        this.w3o.octopus.networks.setCurrentNetwork(name, context);
    }

    logoutSession(session: W3oSession) {
        const context = logger.method('logoutSession');
        session.logout(context);
    }

    login() {
        this.sessionService.login();
    }

    selectSession(session: W3oSession) {
        this.redirect.enable();
        const context = logger.method('selectSession');
        this.w3o.octopus.sessions.setCurrentSession(session.id, context);
    }

    shorten(address: string): string {
        return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
    }
}
