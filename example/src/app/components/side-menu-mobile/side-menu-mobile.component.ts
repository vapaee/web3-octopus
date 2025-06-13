import { Component } from '@angular/core';
import { SideContainerComponent } from '@app/components/base-components/side-container/side-container.component';
import {
    LucideAngularModule,
    ChartCandlestick,
    Settings,
    Coins,
    Wallet,
    LogOut,
    ListTree,
    Users
} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { SessionService } from '@app/services/session-kit.service';
import { SharedModule } from '@app/shared/shared.module';

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
    readonly ChartCandlestickIcon = ChartCandlestick;
    readonly SettingsIcon = Settings;
    readonly CoinsIcon = Coins;
    readonly WalletIcon = Wallet;
    readonly LogoutIcon = LogOut;
    readonly ListTreeIcon = ListTree;
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
        public sessionService: SessionService
    ) {}

    get isLogged(): boolean {
        return !!this.sessionService.current;
    }

    async logout() {
        await this.sessionService.logout();
    }

}
