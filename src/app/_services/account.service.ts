import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { coupon } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private couponSubject: BehaviorSubject<coupon>;
    public coupon: Observable<coupon>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.couponSubject = new BehaviorSubject<coupon>(JSON.parse(localStorage.getItem('user')));
        this.coupon = this.couponSubject.asObservable();
    }

    public get couponValue(): coupon {
        return this.couponSubject.value;
    }

    login(username, password) {
        return this.http.post<coupon>(`${environment.baseUrl + environment.signIn}`, { username, password })
            .pipe(map(coupon => {
                // store coupon details and jwt token in local storage to keep coupon logged in between page refreshes
                localStorage.setItem('coupon', JSON.stringify(coupon['email']));
         
                this.couponSubject.next(coupon);
                return coupon;
            }));
    }

    logout() {
        // remove coupon from local storage and set current coupon to null
        this.http.get('/signout')
        localStorage.removeItem('user');
        this.couponSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(coupon: coupon) {
        return this.http.post(`${environment.baseUrl + environment.signUp}`, coupon);
    }

    getAll() {
        return this.http.get<coupon[]>(`${environment.baseUrl + environment.coupons}`);
    }

    getById(id: string) {
        return this.http.get<coupon>(`${environment.baseUrl}/coupons/${id}`);
    }

    registerCoupon(data) {
        return this.http.post(`${environment.baseUrl + environment.createCoupon}`, data);
    }

    delete(id: string) {
        return this.http.delete(`${environment.baseUrl + environment.deleteCoupon}/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in coupon deleted their own record
               
                return x;
            }));
    }
}