import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '@app/components/base-components/drop-down/drop-down.component';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '@app/services/session-kit.service';
import { LucideAngularModule, User } from 'lucide-angular';
import { SharedModule } from '@app/shared/shared.module';
import { Web3OctopusService } from '@app/services/web3-octopus.service';
import { W3oSession, W3oContextFactory } from '@vapaee/w3o-core';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        DropDownComponent,
        RouterModule,
        LucideAngularModule,
        SharedModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    readonly UserIcon = User
    private logger = new W3oContextFactory('LoginComponent');

    constructor(
        public sessionService: SessionService,
        private w3o: Web3OctopusService,
        private router: Router,
    ) {}

    async login() {
        await this.router.navigate(['/accounts']);
    }

    get sessions(): W3oSession[] {
        return this.w3o.octopus.sessions.list;
    }

    selectSession(session: W3oSession) {
        const context = this.logger.method('selectSession');
        this.w3o.octopus.sessions.setCurrentSession(session.id, context);
    }

    shorten(address: string): string {
        return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
    }
}
