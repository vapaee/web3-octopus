import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { user } from '@app/store/user';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LucideAngularModule, Menu, ScanQrCode, Sun, Moon, Globe} from 'lucide-angular'
import { SessionService } from '@app/services/session-kit.service';
import { BREAKPOINT } from '@app/types';
import { SideContainerService } from '@app/components/base-components/side-container/side-container.service';
import { DropDownComponent } from '../base-components/drop-down/drop-down.component';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        LoginComponent,
        LucideAngularModule,
        DropDownComponent,
        SharedModule
    ],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
    readonly MenuIcon = Menu
    readonly QrIcon = ScanQrCode
    readonly SunIcon = Sun
    readonly MoonIcon = Moon
    readonly GlobeIcon = Globe

    isDarkTheme = false;
    isMobileView = false;
    menuId = 'mobile-menu';

    private destroy$ = new Subject<void>();

    constructor(
        private store: Store<AppState>,
        private breakpointObserver: BreakpointObserver,
        private sideContainerService: SideContainerService,
        private translate: TranslateService,
        private sessionService: SessionService,
    ) {}

    ngOnInit() {
        // Detect theme preference
        this.store.select(user.selectors.isDarkTheme)
            .pipe(takeUntil(this.destroy$))
            .subscribe((isDark) => {
                this.isDarkTheme = isDark;
            });

        // Detect viewport size
        this.breakpointObserver.observe(BREAKPOINT)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.isMobileView = result.matches;
            });
    }

    toggleTheme() {
        this.isDarkTheme
            ? this.store.dispatch(user.actions.setLight())
            : this.store.dispatch(user.actions.setDark());
    }

    toggleMobileSideMenu() {
        this.sideContainerService.toggle('mobile-side-menu');
    }

    setLang( l: string ) {
        this.translate.use(l)
    }

    get isLogged(): boolean {
        return !!this.sessionService.current;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
