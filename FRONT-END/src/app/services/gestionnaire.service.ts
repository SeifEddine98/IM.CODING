import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {catchError, Observable, throwError} from 'rxjs';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class GestionnaireService {
  public API = '//localhost:1120/Gestionnaire';

  constructor(private http: HttpClient, private authService: AuthenticationService) { 

  }
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return headers;
  }
  getAllFormateurs(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllFormateurs', { headers });
  }
  getAllEtudiants(): Observable<any> {
        const headers = this.getHeaders();
        console.log(headers);
    return this.http.get(this.API + '/getAllEtudiants', { headers });
  }
  getAllFactures(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllFactures', { headers });
  }
  getAllSeances(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllSeances', { headers });
  }
   getAllConges(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllConges', { headers });
  }
  getAllFormations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllFormations2', { headers });
  }
  getAllFormations1(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllFormations', { headers });
  }
  addFormateur(photo_profil: File, formateur: any): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
     Object.keys(formateur).forEach(key => {
      formData.append(key, formateur[key]);
    });
    console.log(formateur);
    return this.http.post<any>(this.API + '/addFormateur', formData, { headers })
      .pipe(catchError(this.handleError));
  }
   updateFormateur(formateur: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateFormateur/${id}`;
    return this.http.put<any>(url, formateur, { headers })
      .pipe(catchError(this.handleError));
  }
  updatePhotoFormateur(photo_profil: File, id: number): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('photo_profil', photo_profil);
    return this.http.put(`${this.API}/updatePhotoFormateur/${id}`, formData, { headers });
  }
   deleteFormateur(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteFormateur/${id}`;
    return this.http.delete(url, { headers });
  }
   getFormateurById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getFormateurById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  getImageUrl(id: number): string {
    return `http://localhost:1120/Gestionnaire/getFormateurPhotoById/${id}`;
  }
  addFacture(etudiantId: number, facture: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addFacture?etudiant_id=${etudiantId}`;
    return this.http.post<any>(url, facture, { headers });
  }
  addPaiement(facture_id: number, paiement: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addPaiement?facture_id=${facture_id}`;
    return this.http.post<any>(url, paiement, { headers });
  }
  getFactureById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getFactureById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  updateFacture( facture: any,id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateFacture/${id}`;
    return this.http.put<any>(url, facture, { headers });
  }
  getPresenceByEtudiant(etudiant_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getPresenceByEtudiant/${etudiant_id}`;
    return this.http.get<any>(url, { headers });
  }
  downloadJustificatif(id: number): void {
    const headers = this.getHeaders();
    this.http.get(`http://localhost:1120/Gestionnaire/getCongeJustById/${id}`, { headers,responseType: 'blob' })
      .subscribe(response => {
        const file = new Blob([response], { type: 'application/pdf' });
        saveAs(file, 'justificatif.pdf');
      });
  }
  getCongeById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getCongeById/${id}`;
    return this.http.get<any>(url, { headers });
  } 
  validerConge(conge_id: number, conge: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/validerConge?conge_id=${conge_id}`;
    return this.http.put<any>(url, conge, { headers });
  }
  deleteConge(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteConge/${id}`;
    return this.http.delete(url, { headers });
  }
  addFormation(formateurId: number, formation: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addFormation?formateur_id=${formateurId}`;
    return this.http.post<any>(url, formation, { headers });
  }
  getFormationById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getFormationById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  deleteFormation(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteFormation/${id}`;
    return this.http.delete(url, { headers });
  }
  updateFormation( formation: any,id: number, formateur_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateFormation/${id}/${formateur_id}`;
    return this.http.put<any>(url, formation, { headers });
  }  
  addEtudiant(formationId: number, etudiant: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addEtudiant?formation_id=${formationId}`;
    return this.http.post<any>(url, etudiant, { headers });
  }
  getEtudiantById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getEtudiantById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  deleteEtudiant(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/deleteEtudiant/${id}`;
    return this.http.delete(url, { headers });
  }
  updateEtudiant( etudiant: any,id: number, formation_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/updateEtudiant/${id}/${formation_id}`;
    return this.http.put<any>(url, etudiant, { headers });
  }  
  addSeance(formationId: number, seance: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addSeance?formation_id=${formationId}`;
    return this.http.post<any>(url, seance, { headers });
  }
  getSeanceById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getSeanceById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  deleteSeance(id: number): Observable<any> {
        const headers = this.getHeaders();
    const url = `${this.API}/deleteSeance/${id}`;
    return this.http.delete(url, { headers });
  }
  updateSeance( seance: any,id: number, formation_id: number): Observable<any> {
            const headers = this.getHeaders();
    const url = `${this.API}/updateSeance/${id}/${formation_id}`;
    return this.http.put<any>(url, seance, { headers });
  }  
  getGestionnaireByEmail(email: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getGestionnaireByEmail?email=${email}`;
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
