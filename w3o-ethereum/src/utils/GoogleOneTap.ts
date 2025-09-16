import { BehaviorSubject, Subject } from 'rxjs';

export interface GoogleCredentials {
    email: string;
    jwt: string;
}

interface GoogleOneTap {
    accounts: {
        id: {
            initialize: (config: { client_id: string, callback: (notification: GoogleNotification) => void }) => void;
            prompt: (callback: (notification: GoogleNotification) => void) => void;
            renderButton: (element: HTMLElement, config: { theme: string, size: string }) => void;
            disableAutoSelect: () => void;
        }
    }
}

interface GoogleNotification {
    getMomentType: () => string;
    isDisplayed: () => boolean;
    isNotDisplayed: () => boolean;
    isSkippedMoment: () => boolean;
    isDismissedMoment: () => boolean;
    getNotDisplayedReason: () => string;
    getSkippedReason: () => string;
    getDismissedReason: () => string;
    credential: string;
}

interface SuccessResponse {
    header: {
        alg: string;
        kid: string;
        typ: string;
    };
    payload: {
        iss: string;
        azp: string;
        aud: string;
        sub: string;
        email: string;
        email_verified: boolean;
        at_hash: string;
        nonce: string;
        exp: number;
        iat: number;
    };
}

let google: GoogleOneTap | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _window = (window as any);

class GoogleOneTapController {

    private _logged = false;
    onSuccessfulLogin = new BehaviorSubject<GoogleCredentials | null>(null);
    onError = new BehaviorSubject<string | null>(null);
    onMoment = new Subject<{ type: string, status: string, reason: string }>();
    clientId: string = 'GoogleClientIdNotSet';

    buttonConfig = { theme: 'outline', size: 'large' }; // default config

    constructor() {
        this.installGoogleOneTapScript();
    }

    get logged() {
        return this._logged;
    }

    installGoogleOneTapScript() {
        if (google) {
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        _window.onGoogleLibraryLoad = () => {
            this.onGoogleLibraryLoad();
        };
    }

    onGoogleLibraryLoad(clientId?: string) {
        this.setClientId(clientId || this.clientId);
        if (!google) {
            if (_window.google) {
                google = _window.google;
            } else {
                throw new Error('Google One Tap library not loaded');
            }
        }
        if (google) {
            google.accounts.id.initialize({
                client_id: this.clientId,
                callback: (response: GoogleNotification | null) => {
                    if (response) {
                        const jwt = response.credential;
                        const decoded = this.decodeJWT(jwt);
                        this.handleOneTapSuccess(decoded, jwt);
                    } else {
                        this.handleOneTapError(JSON.stringify(response));
                    }
                },
            });
        }
    }

    // --- helpers: base64url → string/json (browser-safe, no Buffer) ---

    private base64UrlToUint8Array(segment: string): Uint8Array {
        // Convert base64url to base64
        let base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad !== 0) {
            base64 += '='.repeat(4 - pad);
        }
        // Decode base64 to bytes
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    private base64UrlJsonParse<T>(segment: string): T {
        const bytes = this.base64UrlToUint8Array(segment);
        const jsonText = new TextDecoder('utf-8').decode(bytes);
        return JSON.parse(jsonText) as T;
    }

    public decodeJWT(jwt: string): SuccessResponse {
        const parts = jwt.split('.');
        if (parts.length < 2) {
            throw new Error('Invalid JWT format');
        }
        const header = this.base64UrlJsonParse<SuccessResponse['header']>(parts[0]);
        const payload = this.base64UrlJsonParse<SuccessResponse['payload']>(parts[1]);
        // Optional: minimal runtime shape check
        if (!payload?.email) {
            throw new Error('Invalid JWT payload');
        }
        return { header, payload };
    }

    setButtonConfig(config: { theme: string, size: string }) {
        this.buttonConfig = config;
    }

    setClientId(id: string) {
        this.clientId = id;
    }

    timer = setTimeout(() => { /**/ }, 0);
    renderButton(tag_id = 'google_btn') {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const btn = document.getElementById(tag_id);
            if (!btn) {
                console.error('google button not found using tag_id: ', tag_id);
            }
            if (google && btn) {
                google.accounts.id.renderButton(
                    btn, this.buttonConfig,
                );
            }
        }, 100);
    }

    handleOneTapMoment(type: string, status: string, reason: string) {
        this.onMoment.next({ type, status, reason });
    }

    handleOneTapSuccess(response: SuccessResponse, jwt: string) {
        const email = response.payload.email;
        this._logged = true;
        this.onSuccessfulLogin.next({ email, jwt });
    }

    handleOneTapError(error: string) {
        console.error('handleOneTapError', error);
        this.onError.next(error);
    }

    logout() {
        if (google) {
            google.accounts.id.disableAutoSelect();
            this._logged = false;
            this.onSuccessfulLogin.next(null);
        }
    }
}

export const googleCtrl = new GoogleOneTapController();
