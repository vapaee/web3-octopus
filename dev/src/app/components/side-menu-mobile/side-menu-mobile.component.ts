import { Component } from '@angular/core';
import { SideContainerComponent } from '@app/components/base-components/side-container/side-container.component';
import {
    LucideAngularModule,
    Home,
    Settings,
    Wallet,
    LogOut,
    Users
} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { SessionService } from '@app/services/session-kit.service';
import { SharedModule } from '@app/shared/shared.module';
import { Web3OctopusService } from '@app/services/web3-octopus.service';

@Component({
    selector: 'app-side-menu-mobile',
    imports: [
        SideContainerComponent,
        LucideAngularModule,
        RouterModule,
        SharedModule
    ],
    templateUrl: './side-menu-mobile.component.html',
    styleUrl: './side-menu-mobile.component.scss'
})
export class SideMenuMobileComponent {
    readonly HomeIcon = Home;
    readonly SettingsIcon = Settings;
    readonly WalletIcon = Wallet;
    readonly LogoutIcon = LogOut;
    readonly UsersIcon = Users

    // public isLogged: boolean = false;
    // constructor(
    //     public sessionService: SessionService
    // ) {
    //     this.sessionService.session$.subscribe((session) => {
    //         this.isLogged = !!session;
    //     });
    // }

    constructor(
        public sessionService: SessionService,
        private w3o: Web3OctopusService
    ) {}

    get isAntelope(): boolean {
        return this.w3o.octopus.networks.current.type === 'antelope';
    }

    get isLogged(): boolean {
        return !!this.sessionService.current;
    }

    async logout() {
        await this.sessionService.logout();
    }

}
