// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LucideAngularModule, Github } from 'lucide-angular';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [SharedModule, LucideAngularModule],
    template: `
        <div class="p-home">
            <div class="p-home__title">{{ 'PAGES.HOME.TITLE' | translate }}</div>
            <p class="p-home__subtitle">{{ 'PAGES.HOME.DESCRIPTION' | translate }}</p>
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
}
