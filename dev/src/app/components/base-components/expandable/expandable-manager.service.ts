import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpandableManagerService {
    private state = new BehaviorSubject<Record<string, boolean>>({});
    private groupMap = new Map<string, Set<string>>(); // Tracks expandables in groups
    state$ = this.state.asObservable();

    registerGroup(groupId: string, expandableId: string) {
        if (!this.groupMap.has(groupId)) {
            this.groupMap.set(groupId, new Set());
        }
        this.groupMap.get(groupId)!.add(expandableId);
    }

    open(id: string, groupId?: string) {
        const newState = { ...this.state.getValue(), [id]: true };

        // If in a group, close others
        if (groupId && this.groupMap.has(groupId)) {
            for (const expandable of this.groupMap.get(groupId)!) {
                if (expandable !== id) {
                    newState[expandable] = false;
                }
            }
        }

        this.state.next(newState);
    }

    close(id: string) {
        this.state.next({ ...this.state.getValue(), [id]: false });
    }

    toggle(id: string, groupId?: string) {
        const currentState = this.state.getValue();

        if (currentState[id]) {
            this.close(id);
        } else {
            this.open(id, groupId);
        }
    }

    closeGroup(groupId: string) {
        const newState = { ...this.state.getValue() };

        if (this.groupMap.has(groupId)) {
            for (const expandable of this.groupMap.get(groupId)!) {
                newState[expandable] = false;
            }
        }

        this.state.next(newState);
    }

    closeAll() {
        this.state.next({});
    }

}
