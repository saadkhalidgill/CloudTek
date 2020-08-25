import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if coupon is logged in and request is to the api url
        const coupon = this.accountService.couponValue;
        const isLoggedIn = coupon && coupon.token;
        const isbaseUrl = request.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isbaseUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${coupon.token}`
                }
            });
        }

        return next.handle(request);
    }
}