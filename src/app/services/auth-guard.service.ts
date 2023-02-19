import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  public isLoggedIn: boolean;
  constructor(
    private authService: AuthenticationService,
    private _router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.currentUser.subscribe((user) => {
      const isValidUser = !!(user && Object.keys(user).length !== 0);
      this.isLoggedIn = isValidUser;
    });

    if (this.isLoggedIn) {
      this._router.navigate(['/jobs']);
      return false;
    } else {
      return true;
    }
  }
}
