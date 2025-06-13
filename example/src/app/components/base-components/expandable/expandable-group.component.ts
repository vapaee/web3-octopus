import { Component, ContentChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ExpandableComponent } from './expandable.component';
import { ExpandableManagerService } from './expandable-manager.service';

@Component({
    selector: 'app-expandable-group',
    standalone: true,
    template: `<ng-content></ng-content>`,
})
export class ExpandableGroupComponent implements AfterViewInit {
    @ContentChildren(ExpandableComponent) expandables!: QueryList<ExpandableComponent>;
    private groupId = `group-${Math.random().toString(36).substr(2, 9)}`;

    constructor(private expandableManager: ExpandableManagerService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.registerExpandables();

        // Listen for QueryList updates (e.g., if expandables are added later)
        this.expandables.changes.subscribe(() => {
            this.registerExpandables();
        });
    }

    private registerExpandables(): void {
        if (!this.expandables || this.expandables.length === 0) return;

        this.expandables.forEach((expandable) => {
            expandable.groupId = this.groupId;
            this.expandableManager.registerGroup(this.groupId, expandable.expandableId);
        });

        this.cdr.detectChanges(); // Ensure Angular detects changes
    }
}
