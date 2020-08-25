import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    coupons = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(coupons => this.coupons = coupons['data']);
    }

    deleteCoupon(id: string) {
        const coupon = this.coupons.find(x => x.id === id);
        coupon.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.coupons = this.coupons.filter(x => x.id !== id) 
            });
    }
}