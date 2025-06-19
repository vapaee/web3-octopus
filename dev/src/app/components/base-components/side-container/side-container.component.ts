import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SideContainerService } from './side-container.service';

@Component({
    selector: 'app-side-container',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './side-container.component.html',
    styleUrls: ['./side-container.component.scss']
})
export class SideContainerComponent implements OnInit, OnDestroy {
    @Input() id!: string;
    @Input() side: 'left' | 'right' = 'right';
    isOpen = false;
    private subscription!: Subscription;

    constructor(private sideContainerService: SideContainerService) {}

    ngOnInit() {
        this.subscription = this.sideContainerService.state$.subscribe(state => {
            this.isOpen = !!state[this.id];
        });
    }

    close() {
        this.sideContainerService.close(this.id);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
