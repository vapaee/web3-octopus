import { W3oAccount, W3oNetwork, W3oSession } from '.';
export declare class W3oSessionManager {
    createSession(account: W3oAccount, network: W3oNetwork): W3oSession;
    openSession(account: W3oAccount): W3oSession;
    getSession(id: string): W3oSession;
    getSessions(): W3oSession[];
    deleteSession(id: string): void;
    setCurrentSession(id: string): void;
    getCurrentSession(): W3oSession;
    snapshot(): any;
}
