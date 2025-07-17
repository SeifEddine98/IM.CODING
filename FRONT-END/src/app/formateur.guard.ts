import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const userType = this.authService.getUserType();

    if (userType === 'administrateur') {
      this.router.navigate(['/MenuAdmin']);
      return false;
    }

    if (userType === 'gestionnaire') {
      this.router.navigate(['/MenuGestionnaire']);
      return false;
    }

    return true;
  }
  
}
