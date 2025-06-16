// w3o-core/src/classes/W3oDefaultHttpClient.ts

import { Observable } from "rxjs";
import { W3oHttpClient } from "../types";

/**
 * Default HTTP client using Fetch API to implement GET requests as observables
 */
export class W3oDefaultHttpClient implements W3oHttpClient {

    /**
     * Performs a GET request and returns an observable with the response JSON
     */
    get<T>(url: string): Observable<T> {
        return new Observable<T>(subscriber => {
            fetch(url, { method: 'GET' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    subscriber.next(data as T);
                    subscriber.complete();
                })
                .catch(error => {
                    subscriber.error(error);
                });
        });
    }

    /**
     * Performs a POST request with a JSON body and returns an observable with the response JSON
     */
    post<T>(url: string, body: unknown): Observable<T> {
        return new Observable<T>(subscriber => {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    subscriber.next(data as T);
                    subscriber.complete();
                })
                .catch(error => {
                    subscriber.error(error);
                });
        });
    }
}
