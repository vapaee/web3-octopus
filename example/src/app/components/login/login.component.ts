import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '@app/components/base-components/drop-down/drop-down.component';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '@app/services/session-kit.service';
import { LucideAngularModule, User } from 'lucide-angular';
import { ExpandableManagerService } from '../base-components/expandable/expandable-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { Web3OctopusService } from '@app/services/web3-octopus.service';

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

    constructor(
        public sessionService: SessionService,
        public expandibles: ExpandableManagerService,
        private w3o: Web3OctopusService,
        private router: Router,
    ) {}

    get isAntelope(): boolean {
        return this.w3o.octopus.networks.current.type === 'antelope';
    }

    async login() {
        await this.router.navigate(['/accounts']);
    }

    async logout() {
        await this.sessionService.logout();
        this.expandibles.closeAll();
    }
}
