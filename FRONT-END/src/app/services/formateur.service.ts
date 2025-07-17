import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  public API = '//localhost:1120/Formateur';

  constructor(private http: HttpClient, private authService: AuthenticationService) { 

  }
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return headers;
  }
  getEtudiantByFormateur(formateur_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getEtudiantByFormateur/${formateur_id}`;
    return this.http.get<any>(url, { headers });
  }
  assignerAssiduite(presences: any[]): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/assignerAssiduite`;
    return this.http.post<any>(url, presences, { headers });
  }
  
  updateSeance( seance: any,id: number): Observable<any> {
    const headers = this.getHeaders();
const url = `${this.API}/updateSeance/${id}`;
return this.http.put<any>(url, seance, { headers });
}  
   getSeanceById(id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getSeanceById/${id}`;
    return this.http.get<any>(url, { headers });
  }
  getSeanceByFormateur(formateur_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getSeanceByFormateur/${formateur_id}`;
    return this.http.get<any>(url, { headers });
  }
  getCongeByFormateur(formateur_id: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getCongeByFormateur/${formateur_id}`;
    return this.http.get<any>(url, { headers });
  }
  getFormateurByEmail(email: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/getFormateurByEmail?email=${email}`;
    return this.http.get<any>(url, { headers });
  }
  addConge(justificatif: File,formateurId: number, conge: any): Observable<any> {
        const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('justificatif', justificatif);
    Object.keys(conge).forEach(key => {
      formData.append(key, conge[key]);
    });
    const url = `${this.API}/addConge?formateur_id=${formateurId}`;
    return this.http.post<any>(url, formData, { headers });
  }
  addPresence(seanceId: number, etudiantId: number, presence: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.API}/addPresence?seance_id=${seanceId}&etudiant_id=${etudiantId}`;
    return this.http.post<any>(url, presence, { headers });
  }
   getAllEtudiants(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllEtudiants', { headers });
  }
  getAllSeances(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API + '/getAllSeances', { headers });
  }
}
