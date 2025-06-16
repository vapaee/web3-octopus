// w3o-core/src/classes/W3oDefaultHttpClient.ts
import { Observable } from "rxjs";
/**
 * Default HTTP client using Fetch API to implement GET requests as observables
 */
export class W3oDefaultHttpClient {
    /**
     * Performs a GET request and returns an observable with the response JSON
     */
    get(url) {
        return new Observable(subscriber => {
            fetch(url, { method: 'GET' })
                .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
                .then(data => {
                subscriber.next(data);
                subscriber.complete();
            })
                .catch(error => {
                subscriber.error(error);
            });
        });
    }
}
