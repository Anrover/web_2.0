import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../services/АuthenticationService.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
     private authenticationService: AuthenticationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean> | Promise<boolean> | boolean {
    // localStorage.removeItem('currentUser');
    let item = JSON.parse(localStorage.getItem('currentUser'));
    console.log(item);
    if (item)
      return this.authenticationService.refreshToken(item['login'], item['token']).map(e => {
        console.log(e);
        if (e) {
            return true;
        }
      }).catch(() => {
          this.router.navigate(['/login']);
          return Observable.of(false);
      });
    this.router.navigate(['/login']);
    return Observable.of(false);
  }
}
