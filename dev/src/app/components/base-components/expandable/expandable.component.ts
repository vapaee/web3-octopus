import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExpandableManagerService } from './expandable-manager.service';

@Component({
    selector: 'app-expandable',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit, OnDestroy {
    @Input() expandableId!: string;
    @Input() groupId?: string;
    @Output() open = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
    @Output() toggle = new EventEmitter<boolean>();
    isOpen = false;
    private subscription!: Subscription;
    private previousState = false;

    constructor(private expandableManager: ExpandableManagerService) {}

    ngOnInit() {
        this.subscription = this.expandableManager.state$.subscribe(state => {
            // Determine the new open state from the manager state
            const newOpenState = !!state[this.expandableId];
            // Emit events only if the state has changed
            if (newOpenState !== this.previousState) {
                this.isOpen = newOpenState;
                if (newOpenState) {
                    this.open.emit();
                } else {
                    this.close.emit();
                }
                // Emit the toggle event with the new state
                this.toggle.emit(newOpenState);
                this.previousState = newOpenState;
            }
        });
    }

    toggleComponent() {
        this.expandableManager.toggle(this.expandableId, this.groupId);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
