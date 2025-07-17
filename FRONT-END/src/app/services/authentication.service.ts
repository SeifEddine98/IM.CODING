import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public API = '//localhost:1120';
  public tokenKey = 'token';
  public userTypeKey = 'userType'; // Clé pour stocker le type d'utilisateur
 constructor(private http: HttpClient) { }

  loginG(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/Gestionnaire/authenticate`, { userName, password }, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        tap(response => {
          localStorage.setItem(this.tokenKey, response); // Stocker le token dans le localStorage
        })
      );
  }
  loginF(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/Formateur/authenticate`, { userName, password }, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        tap(response => {
          localStorage.setItem(this.tokenKey, response); // Stocker le token dans le localStorage
        })
      );
  }
  loginA(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/Administrateur/authenticate`, { userName, password }, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        tap(response => {
          localStorage.setItem(this.tokenKey, response); // Stocker le token dans le localStorage
        })
      );
  }
  getToken(): string {
    return localStorage.getItem(this.tokenKey) || ''; // Récupérer le token depuis le localStorage
  }
  extractEmailFromToken(): string {
    const decodedToken = this.parseJwt(this.getToken());
    return decodedToken ? decodedToken.sub : '';
  }
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userTypeKey);
    }
  isTokenExpired(): boolean {
    const decodedToken = this.parseJwt(this.getToken());
    if (decodedToken) {
      const expirationTime = decodedToken.exp; 
      const currentTime = Math.floor(Date.now() / 1000);
      return expirationTime < currentTime; 
    }
    return true; 
  }
  setTypeOfUser(type: string): void {
    localStorage.setItem(this.userTypeKey, type);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== '' && !this.isTokenExpired();
  }
}
