import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  public API = '//localhost:1120/Administrateur';

  constructor(private http: HttpClient, private authService: AuthenticationService) {

   }
   private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return headers;
  }
  getAdminByEmail(email: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getAdminByEmail?email=${email}`;
    return this.http.get<any>(url, { headers });
  }
   addAdmin(photo_profil: File, administrateur: any): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
     Object.keys(administrateur).forEach(key => {
      formData.append(key, administrateur[key]);
    });
    console.log(administrateur);
    return this.http.post<any>(this.API + '/addAdmin', formData, { headers })
      .pipe(catchError(this.handleError));
  }
  addGest(photo_profil: File, gestionnaire: any): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
     Object.keys(gestionnaire).forEach(key => {
      formData.append(key, gestionnaire[key]);
    });
    console.log(gestionnaire);
    return this.http.post<any>(this.API + '/addGest', formData, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllGestionnaires(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllGestionnaires', { headers });
  }
  getAllAdmins(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllAdmins', { headers });
  }
  getGestionnaireById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getGestionnaireById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  getAdminById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getAdminById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  getImageGestionnaireUrl(id: number): string {
    return `http://localhost:1120/Administrateur/getGestionnairePhotoById/${id}`;
  }
  getImageAdminUrl(id: number): string {
    return `http://localhost:1120/Administrateur/getAdminPhotoById/${id}`;
  }
  updateGestionnaire(gestionnaire: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateGestionnaire/${id}`;
    return this.http.put<any>(url, gestionnaire, { headers })
      .pipe(catchError(this.handleError));
  }
  updateAdmin(administrateur: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateAdmin/${id}`;
    return this.http.put<any>(url, administrateur, { headers })
      .pipe(catchError(this.handleError));
  }
  updatePhotoGestionnaire(photo_profil: File, id: number): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
    return this.http.put(`${this.API}/updatePhotoGestionnaire/${id}`, formData, { headers });
  }
  updatePhotoAdmin(photo_profil: File, id: number): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
    return this.http.put(`${this.API}/updatePhotoAdmin/${id}`, formData, { headers });
  }
  deleteGestionnaire(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteGestionnaire/${id}`;
    return this.http.delete(url, { headers });
  }
  deleteAdmin(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteAdmin/${id}`;
    return this.http.delete(url, { headers });
  }
  NbCongesFormateur(formateur_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbCongesFormateur/${formateur_id}`;
    return this.http.get<any>(url, { headers });
  }
  NbEtudiantsParFormation(formation_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbEtudiantsParFormation/${formation_id}`;
    return this.http.get<any>(url, { headers });
  }
  NbTotalFactures(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbTotalFactures`;
    return this.http.get<any>(url, { headers });
  }
  NbTotalFacturesPayees(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbTotalFacturesPayees`;
    return this.http.get<any>(url, { headers });
  }
  NbTotalFacturesPartiellemntPayees(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbTotalFacturesPartiellemntPayees`;
    return this.http.get<any>(url, { headers });
  }
  NbTotalFacturesNonPayees(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/NbTotalFacturesNonPayees`;
    return this.http.get<any>(url, { headers });
  }
     private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
