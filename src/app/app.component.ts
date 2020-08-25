import { Component } from '@angular/core';

import { AccountService } from './_services';
import { coupon } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    coupon: coupon;

    constructor(private accountService: AccountService) {
        this.accountService.coupon.subscribe(x => this.coupon = x);
    }

    logout() {
        this.accountService.logout();
    }
}