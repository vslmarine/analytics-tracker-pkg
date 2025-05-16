import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AnalyticsTrackerService {
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
            sessionKey = uuidv4();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLXRyYWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuYWx5dGljcy10cmFja2VyL3NyYy9saWIvYW5hbHl0aWNzLXRyYWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFxQnBDLE1BQU0sT0FBTyx1QkFBdUI7SUFRaEMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVA1QixXQUFNLEdBQUcsaURBQWlELENBQUM7UUFFM0QsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUdoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVksQ0FBQyxRQUFnQixFQUFFLFdBQW1CO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQixDQUFDLE1BQWM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUVqQyw0QkFBNEI7UUFDNUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckYsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxPQUFPO1lBQUUsT0FBTztRQUU1QyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUU5Qiw0QkFBNEI7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixNQUFNLE9BQU8sR0FBRyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzVELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNoRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELG9CQUFvQjtRQUNwQixNQUFNLFNBQVMsR0FBYztZQUN6QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDOUIsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzVCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFVBQVUsRUFBRSxTQUFTLENBQUMsU0FBUztZQUMvQixjQUFjLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDakMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ25DLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxZQUFZO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3BFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDVCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUMxRCxDQUFDO0lBQ04sQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixNQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQztRQUNwQyxJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNkLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQztZQUN0QixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLElBQVM7UUFDL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNwQixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7K0dBcEZRLHVCQUF1QjttSEFBdkIsdUJBQXVCLGNBRnBCLE1BQU07OzRGQUVULHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5cclxuaW50ZXJmYWNlIFZpc2l0RGF0YSB7XHJcbiAgICB3ZWJzaXRlX3VzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICB3ZWJzaXRlX25hbWU6IHN0cmluZztcclxuICAgIHNlc3Npb25fa2V5Pzogc3RyaW5nO1xyXG4gICAgcGFnZV91cmw/OiBzdHJpbmc7XHJcbiAgICB1c2VyX2FnZW50Pzogc3RyaW5nO1xyXG4gICAgdmlld3BvcnRfd2lkdGg/OiBudW1iZXI7XHJcbiAgICB2aWV3cG9ydF9oZWlnaHQ/OiBudW1iZXI7XHJcbiAgICB2aXNpdF9kYXRlPzogc3RyaW5nO1xyXG4gICAgdmlzaXRfdGltZT86IHN0cmluZztcclxuICAgIHZpc2l0X2R1cmF0aW9uPzogbnVtYmVyO1xyXG4gICAgaXNfZXhpdD86IGJvb2xlYW47XHJcbiAgICByZWZlcnJlcj86IHN0cmluZztcclxuICAgIGlwX2FkZHJlc3M/OiBzdHJpbmc7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzVHJhY2tlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBhcGlVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9kYXNoYm9hcmQvdHJhY2stdmlzaXQnO1xyXG4gICAgcHJpdmF0ZSBzZXNzaW9uS2V5OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgd2Vic2l0ZU5hbWU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSB0cmFja2luZ0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBsYXN0VHJhY2tlZFVybDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uS2V5ID0gdGhpcy5nZXRPckNyZWF0ZVNlc3Npb25LZXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdHJhY2tpbmcgZm9yIGN1cnJlbnQgdXNlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRyYWNraW5nKHVzZXJuYW1lOiBzdHJpbmcsIHdlYnNpdGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy53ZWJzaXRlTmFtZSA9IHdlYnNpdGVOYW1lO1xyXG4gICAgICAgIHRoaXMudHJhY2tpbmdBY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhY2sgcGFnZSBuYXZpZ2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFja1BhZ2VOYXZpZ2F0aW9uKG5ld1VybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRyYWNraW5nQWN0aXZlKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEVuc3VyZSB3ZSBoYXZlIGEgZnVsbCBVUkxcclxuICAgICAgICBjb25zdCBmdWxsVXJsID0gbmV3VXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/IG5ld1VybCA6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBuZXdVcmw7XHJcblxyXG4gICAgICAgIC8vIFNraXAgaWYgc2FtZSBVUkxcclxuICAgICAgICBpZiAodGhpcy5sYXN0VHJhY2tlZFVybCA9PT0gZnVsbFVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3RUcmFja2VkVXJsID0gZnVsbFVybDtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgZGF0ZSBhbmQgdGltZVxyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgdGltZVpvbmU6ICdBc2lhL0tvbGthdGEnLCBob3VyMTI6IGZhbHNlIH07XHJcbiAgICAgICAgY29uc3QgdmlzaXREYXRlID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tQ0EnLCB7IHRpbWVab25lOiAnQXNpYS9Lb2xrYXRhJyB9KTtcclxuICAgICAgICBjb25zdCB2aXNpdFRpbWUgPSBub3cudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1HQicsIG9wdGlvbnMpO1xyXG4gICAgICAgIC8vIENyZWF0ZSB2aXNpdCBkYXRhXHJcbiAgICAgICAgY29uc3QgdmlzaXREYXRhOiBWaXNpdERhdGEgPSB7XHJcbiAgICAgICAgICAgIHdlYnNpdGVfdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHdlYnNpdGVfbmFtZTogdGhpcy53ZWJzaXRlTmFtZSxcclxuICAgICAgICAgICAgc2Vzc2lvbl9rZXk6IHRoaXMuc2Vzc2lvbktleSxcclxuICAgICAgICAgICAgcGFnZV91cmw6IGZ1bGxVcmwsXHJcbiAgICAgICAgICAgIHVzZXJfYWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAgIHZpZXdwb3J0X3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgICAgICAgdmlld3BvcnRfaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgICAgIHZpc2l0X2RhdGU6IHZpc2l0RGF0ZSxcclxuICAgICAgICAgICAgdmlzaXRfdGltZTogdmlzaXRUaW1lLFxyXG4gICAgICAgICAgICB2aXNpdF9kdXJhdGlvbjogMCxcclxuICAgICAgICAgICAgaXNfZXhpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlZmVycmVyOiBkb2N1bWVudC5yZWZlcnJlcixcclxuICAgICAgICAgICAgaXBfYWRkcmVzczogJydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygndmlzaXREYXRhJywgdmlzaXREYXRhKTtcclxuICAgICAgICAvLyBTZW5kIGRhdGFcclxuICAgICAgICB0aGlzLmh0dHAucG9zdCh0aGlzLmFwaVVybCwgdGhpcy5jb252ZXJ0VG9Gb3JtRGF0YSh2aXNpdERhdGEpKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICgpID0+IHsgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcignVHJhY2tpbmcgZXJyb3I6JywgZXJyb3Iuc3RhdHVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPckNyZWF0ZVNlc3Npb25LZXkoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBrZXkgPSAnYW5hbHl0aWNzX3Nlc3Npb25fa2V5JztcclxuICAgICAgICBsZXQgc2Vzc2lvbktleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblxyXG4gICAgICAgIGlmICghc2Vzc2lvbktleSkge1xyXG4gICAgICAgICAgICBzZXNzaW9uS2V5ID0gdXVpZHY0KCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgc2Vzc2lvbktleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXNzaW9uS2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29udmVydFRvRm9ybURhdGEoZGF0YTogYW55KTogRm9ybURhdGEge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtrZXldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgICB9XHJcbn0iXX0=