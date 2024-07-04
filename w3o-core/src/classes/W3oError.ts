
// Representa un error específico dentro de Web3 Octopus
export class W3oError {
    constructor(public message: string, public code: number, public payload: any) {}

    // list of error codes
    public static readonly NETWORK_NOT_FOUND = { message: 'Network not found', code: 1000 };
    public static readonly SESSION_NOT_FOUND = { message: 'Session not found', code: 1001 };
}
