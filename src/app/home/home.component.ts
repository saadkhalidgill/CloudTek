import { Component } from '@angular/core';

import { coupon } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    coupon: coupon;

    constructor(private accountService: AccountService) {
        this.coupon = this.accountService.couponValue;
    }
}