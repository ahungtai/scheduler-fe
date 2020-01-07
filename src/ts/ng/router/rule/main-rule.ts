import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Global } from 'ts/globle';

/**
 * 是否有權限訪問
 */
@Injectable()
export class MainRoutingRule implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return Global.authUser ? true : false;
    }
}

/**
 * 使用者登陸後回到首頁
 */
@Injectable()
export class MainRoutingRule2 implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return Global.authUser ? false : true;
    }
}
