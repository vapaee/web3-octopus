import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideContainerService {
    private state = new BehaviorSubject<Record<string, boolean>>({});
    state$ = this.state.asObservable();

    open(id: string) {
        this.state.next({ ...this.state.getValue(), [id]: true });
    }

    close(id: string) {
        this.state.next({ ...this.state.getValue(), [id]: false });
    }

    toggle(id: string) {
        const currentState = this.state.getValue();
        this.state.next({ ...currentState, [id]: !currentState[id] });
    }
}
