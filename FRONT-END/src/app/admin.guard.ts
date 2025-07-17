import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const userType = this.authService.getUserType();

    if (userType === 'gestionnaire') {
      this.router.navigate(['/MenuGestionnaire']);
      return false;
    }

    if (userType === 'formateur') {
      this.router.navigate(['/MenuFormateur']);
      return false;
    }

    return true;
  }
  
  
}
