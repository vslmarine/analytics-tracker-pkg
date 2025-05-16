import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class AnalyticsTrackerService {
    private http;
    private apiUrl;
    private sessionKey;
    private username;
    private websiteName;
    private trackingActive;
    private lastTrackedUrl;
    constructor(http: HttpClient);
    /**
     * Initialize tracking for current user
     */
    initTracking(username: string, websiteName: string): void;
    /**
     * Track page navigation
     */
    trackPageNavigation(newUrl: string): void;
    private getOrCreateSessionKey;
    private convertToFormData;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalyticsTrackerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnalyticsTrackerService>;
}
