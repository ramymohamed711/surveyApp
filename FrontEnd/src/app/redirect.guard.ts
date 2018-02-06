import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import { AuthserviceService } from './authservice.service'
@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.Auth()) {
      this.router.navigateByUrl('/home', { skipLocationChange: true })
      return false;
    }
    return true;
  }
}
