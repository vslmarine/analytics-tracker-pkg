import * as i0 from '@angular/core';
import { Injectable, Component } from '@angular/core';
import { v4 } from 'uuid';
import * as i1 from '@angular/common/http';

class AnalyticsTrackerService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://127.0.0.1:8000/api/dashboard/track-visit';
        this.username = '';
        this.websiteName = '';
        this.trackingActive = false;
        this.lastTrackedUrl = '';
        this.sessionKey = this.getOrCreateSessionKey();
    }
    /**
     * Initialize tracking for current user
     */
    initTracking(username, websiteName) {
        this.username = username;
        this.websiteName = websiteName;
        this.trackingActive = true;
    }
    /**
     * Track page navigation
     */
    trackPageNavigation(newUrl) {
        if (!this.trackingActive)
            return;
        // Ensure we have a full URL
        const fullUrl = newUrl.startsWith('http') ? newUrl : window.location.origin + newUrl;
        // Skip if same URL
        if (this.lastTrackedUrl === fullUrl)
            return;
        this.lastTrackedUrl = fullUrl;
        // Get current date and time
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour12: false };
        const visitDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const visitTime = now.toLocaleTimeString('en-GB', options);
        // Create visit data
        const visitData = {
            website_username: this.username,
            website_name: this.websiteName,
            session_key: this.sessionKey,
            page_url: fullUrl,
            user_agent: navigator.userAgent,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            visit_date: visitDate,
            visit_time: visitTime,
            visit_duration: 0,
            is_exit: false,
            referrer: document.referrer,
            ip_address: ''
        };
        console.log('visitData', visitData);
        // Send data
        this.http.post(this.apiUrl, this.convertToFormData(visitData)).subscribe(() => { }, error => console.error('Tracking error:', error.status));
    }
    getOrCreateSessionKey() {
        const key = 'analytics_session_key';
        let sessionKey = localStorage.getItem(key);
        if (!sessionKey) {
            sessionKey = v4();
            localStorage.setItem(key, sessionKey);
        }
        return sessionKey;
    }
    convertToFormData(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] != null) {
                formData.append(key, data[key].toString());
            }
        }
        return formData;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AnalyticsTrackerService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AnalyticsTrackerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AnalyticsTrackerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class AnalyticsTrackerComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AnalyticsTrackerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: AnalyticsTrackerComponent, isStandalone: true, selector: "lib-analytics-tracker", ngImport: i0, template: `
    <p>
      analytics-tracker works!
    </p>
  `, isInline: true, styles: [""] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AnalyticsTrackerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-analytics-tracker', standalone: true, imports: [], template: `
    <p>
      analytics-tracker works!
    </p>
  ` }]
        }] });

/*
 * Public API Surface of analytics-tracker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AnalyticsTrackerComponent, AnalyticsTrackerService };
//# sourceMappingURL=analytics-tracker.mjs.map
