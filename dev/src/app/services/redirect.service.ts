// src/app/services/redirect.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SessionService } from '@app/services/session-kit.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BREAKPOINT } from '@app/types';
import { W3oContextFactory } from '@vapaee/w3o-core';


const logger = new W3oContextFactory('RedirectService');

@Injectable({
    providedIn: 'root',
})
export class RedirectService implements OnDestroy {
    private destroy$ = new Subject<void>();
    private enabled = true;

    enable() { this.enabled = true; }
    disable() { this.enabled = false; }

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.setupRedirectLogic();
    }

    private setupRedirectLogic() {
        logger.method('setupRedirectLogic');
        let isMobile = false;

        // Detect mobile/desktop
        this.breakpointObserver.observe(BREAKPOINT)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                isMobile = result.matches;
            });

        // Listen for authentication changes
        this.sessionService.session$
            .pipe(takeUntil(this.destroy$))
            .subscribe(session => {
                logger.debug('Redirect - Session changed:', { isMobile, session, enabled: this.enabled });
                if (!this.enabled) {
                    return;
                }
                if (session) {
                    this.router.navigate(['/wallet']);
                } else {
                    if (isMobile) {
                        this.router.navigate(['/accounts']);
                    } else {
                        this.router.navigate(['/']);
                    }
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
