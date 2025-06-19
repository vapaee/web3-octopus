import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { SideMenuMobileComponent } from '@app/components/side-menu-mobile/side-menu-mobile.component';
import { RedirectService } from '@app/services/redirect.service';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { Web3OctopusService } from './services/web3-octopus.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavBarComponent,
        SideMenuMobileComponent,
        SharedModule
    ],
    template: `
        <app-nav-bar class='navbar'></app-nav-bar>
        <div class='view'>
            <router-outlet></router-outlet>
        </div>
        <app-side-menu-mobile></app-side-menu-mobile>
    `,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'my-angular-app';


    constructor(
        private redirectService: RedirectService, //Automatically sets redirection rules
        private translate: TranslateService,
        private octopus: Web3OctopusService,
    ) {
        // Set default language
        this.translate.use('en');


    }
}
