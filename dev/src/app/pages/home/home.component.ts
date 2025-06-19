// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LucideAngularModule, Github, Copy } from 'lucide-angular';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [SharedModule, LucideAngularModule],
    template: `
        <div class="p-home">
            <div class="p-home__header">
                <img class="p-home__logo" src="/assets/octopus.png" alt="octopus" />
                <div class="p-home__title">{{ 'PAGES.HOME.TITLE' | translate }}</div>
            </div>
            <p class="p-home__subtitle">{{ 'PAGES.HOME.DESCRIPTION' | translate }}</p>

            <div class="p-home__packages">
                <a class="p-home__package" href="https://www.npmjs.com/package/@vapaee/w3o-core" target="_blank">&#64;vapaee/web3-core&#64;1.0.1</a>
                <a class="p-home__package" href="https://www.npmjs.com/package/@vapaee/w3o-antelope" target="_blank">&#64;vapaee/web3-antelope&#64;1.0.1</a>
                <a class="p-home__package" href="https://www.npmjs.com/package/@vapaee/w3o-ethereum" target="_blank">&#64;vapaee/web3-ethereum&#64;1.0.0</a>
            </div>

            <div class="p-home__install">
                <code class="p-home__code">npm i &#64;vapaee/web3-core &#64;vapaee/web3-antelope &#64;vapaee/web3-ethereum</code>
                <button class="p-home__copy" (click)="copyInstall()">
                    <lucide-icon [img]="CopyIcon" size="16"></lucide-icon>
                </button>
            </div>

            <a class="p-home__link" href="https://github.com/vapaee/web3-octopus" target="_blank">
                <lucide-icon [img]="GithubIcon" size="16"></lucide-icon>
                {{ 'PAGES.HOME.SOURCE' | translate }}
            </a>
        </div>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    readonly GithubIcon = Github;
    readonly CopyIcon = Copy;

    copyInstall() {
        const cmd = 'npm i @vapaee/web3-core @vapaee/web3-antelope @vapaee/web3-ethereum';
        navigator.clipboard.writeText(cmd);
    }
}
