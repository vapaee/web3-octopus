import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '@app/components/base-components/drop-down/drop-down.component';
import { RouterModule } from '@angular/router';
import { SessionService } from '@app/services/session-kit.service';
import { LucideAngularModule, User } from 'lucide-angular';
import { ExpandableManagerService } from '../base-components/expandable/expandable-manager.service';
import { SharedModule } from '@app/shared/shared.module';

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
    ) {}

    async login() {
        try {
            await this.sessionService.login();
        } catch (error) {
            console.error('Login canceled:', error);
            await this.sessionService.logout();
        }
    }

    async logout() {
        await this.sessionService.logout();
        this.expandibles.closeAll();
    }
}
