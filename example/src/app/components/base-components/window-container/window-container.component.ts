// src/app/reusable/ui/window-container.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-window-container',
    imports: [CommonModule],
    template: `
        <div class="c-window" (click)="onOverlayClick()">
            <div class="c-window__content" (click)="$event.stopPropagation()" tabindex="0">
                <button class="c-window__close-button" (click)="onCloseClick()" aria-label="Close window">&times;</button>
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./window-container.component.scss']
})
export class WindowContainerComponent {
    @Output() close = new EventEmitter<void>();

    /* Emit the close event when the overlay is clicked.*/
    onOverlayClick() {
        this.close.emit();
    }

    /* Emit the close event when the close button is clicked.*/
    onCloseClick() {
        this.close.emit();
    }
}
