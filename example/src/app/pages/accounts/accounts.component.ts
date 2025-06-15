import { Component } from '@angular/core';
import { LoginComponent } from '@app/components/login/login.component';
import { SessionService } from '@app/services/session-kit.service';
import { SharedModule } from '@app/shared/shared.module';
import { connectWallet, sendEth, signMessage } from 'src/prueba';

@Component({
    selector: 'app-accounts',
    standalone: true,
    imports: [
        LoginComponent,
        SharedModule
    ],
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
    constructor(public sessionService: SessionService) {}


    loginEVM() {
        connectWallet().then((addresses) => {
            console.log('Connected addresses:', addresses);
        }).catch((error) => {
            console.error('Error connecting wallet:', error);
        });
    }


    signMessage() {
        signMessage('0xa30b5e3c8Fee56C135Aecb733cd708cC31A5657a', 'Hello, sign this message!')
            .then((signature) => {
                console.log('Signature:', signature);
            }).catch((error) => {
                console.error('Error signing message:', error);
            });
    }

    sendEth() {
        sendEth(
            '0xa30b5e3c8Fee56C135Aecb733cd708cC31A5657a',
            '123'
        ).then((txHash) => {
            console.log('Transaction hash:', txHash);
        }).catch((error) => {
            console.error('Error sending ETH:', error);
        });
    }

}
