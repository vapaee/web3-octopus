import { Observable } from "rxjs";
import { W3oHttpClient } from "../types";
/**
 * Default HTTP client using Fetch API to implement GET requests as observables
 */
export declare class W3oDefaultHttpClient implements W3oHttpClient {
    /**
     * Performs a GET request and returns an observable with the response JSON
     */
    get<T>(url: string): Observable<T>;
}
//# sourceMappingURL=W3oDefaultHttpClient.d.ts.map