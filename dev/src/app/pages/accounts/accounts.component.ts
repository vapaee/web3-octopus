import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '@app/services/session-kit.service';
import { Web3OctopusService } from '@app/services/web3-octopus.service';
import { RedirectService } from '@app/services/redirect.service';
import { SharedModule } from '@app/shared/shared.module';
import { W3oContextFactory, W3oNetwork, W3oSession } from '@vapaee/w3o-core';
import { LucideAngularModule, X } from 'lucide-angular';
import { EthereumWalletMetakeep, googleCtrl, MetakeepWallets } from '@vapaee/w3o-ethereum';
import { Subscription } from 'rxjs';

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
    networkName = this.w3o.octopus.networks.current.name;
    networkType = this.w3o.octopus.networks.current.type;

    // Google Obe Tap Button
    googleCtrl = googleCtrl;
    googleSubscription: Subscription;
    googleLoading: boolean = false;

    constructor(
        public sessionService: SessionService,
        private w3o: Web3OctopusService,
        private redirect: RedirectService,
    ) {
        const context = logger.method('constructor', { sessionService, w3o, redirect });
        w3o.octopus.networks.current$.subscribe((network: W3oNetwork) => {
            context.log('Current network changed:', network);
            this.networkName = network.name;
            this.networkType = network.type;
        });

        /*
        if (!googleCtrl.logged) {
            this.googleSubscription = googleCtrl.onSuccessfulLogin.subscribe({
                next: (data) => {
                    if (data) {
                        this.googleLoading = true;
                        const ethereumSupport = w3o.octopus.auth.getChainSupport('ethereum');
                        const metakeepWallet = ethereumSupport.getWalletByName('metakeep', context) as EthereumWalletMetakeep;
                        if (!metakeepWallet) {
                            throw new Error('Metakeep wallet not found');
                        } else {
                            metakeepWallet.setEmail(data.email);
                            ethereumSupport.setCurentWallet(metakeepWallet, context);
                            this.login();
                        }
                    }
                },
            });

            // we check the div is present before trying to render the google button
            const googleBtnLoop = setInterval(() => {
                // loop until div#google_btn is rendered
                const googleBtn = document.getElementById('google_btn');
                if (googleBtn !== null) {
                    // we found it, so we stop the first loop
                    clearInterval(googleBtnLoop);

                    // Now we call the button render function
                    googleCtrl.renderButton('google_btn');

                    // Now we start a second loop waiting for the div#google_btn_content to be replaced by the actual google btn
                    const googleBtnRenderSecondLoop = setInterval(() => {
                        const googleBtnContent = document.getElementById('google_btn_content');
                        if (googleBtnContent === null) {
                            clearInterval(googleBtnRenderSecondLoop);
                        } else {
                            // if after a whole second it didn't render we call it again
                            googleCtrl.renderButton('google_btn');
                        }
                    }, 1000);
                }
            }, 100);            
        }
        */
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
