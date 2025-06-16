import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '@app/services/session-kit.service';
import { Web3OctopusService } from '@app/services/web3-octopus.service';
import { SharedModule } from '@app/shared/shared.module';
import { W3oContextFactory, W3oSession } from '@vapaee/w3o-core';
import { LucideAngularModule, X } from 'lucide-angular';

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
export class AccountsComponent {
    readonly XIcon = X;
    networks = this.w3o.octopus.networks.list;
    selectedNetwork = this.w3o.octopus.networks.current.name;

    constructor(
        public sessionService: SessionService,
        private w3o: Web3OctopusService,
    ) {}

    get sessions(): W3oSession[] {
        return this.w3o.octopus.sessions.list;
    }

    changeNetwork(name: string) {
        this.w3o.octopus.networks.setCurrentNetwork(
            name,
            new W3oContextFactory('AccountsComponent').method('changeNetwork')
        );
        this.selectedNetwork = name;
    }

    logoutSession(session: W3oSession) {
        session.logout(new W3oContextFactory('AccountsComponent').method('logoutSession'));
    }

    login() {
        this.sessionService.login();
    }

    selectSession(session: W3oSession) {
        this.w3o.octopus.sessions.setCurrentSession(
            session.id,
            new W3oContextFactory('AccountsComponent').method('selectSession')
        );
    }

    shorten(address: string): string {
        return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
    }
}
