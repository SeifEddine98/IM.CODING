import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class GestionnaireGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const userType = this.authService.getUserType();

    if (userType === 'administrateur') {
      this.router.navigate(['/MenuAdmin']);
      return false;
    }

    if (userType === 'formateur') {
      this.router.navigate(['/MenuFormateur']);
      return false;
    }

    return true;
  }
  
  
}
