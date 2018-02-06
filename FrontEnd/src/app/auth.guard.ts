import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthserviceService } from './authservice.service'
import { Router } from '@angular/router'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.Auth())
      this.router.navigateByUrl('/login', { skipLocationChange: true })
    return true;

  }
}
