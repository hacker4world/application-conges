import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServiceCrService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  sendFormData(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sendData', formData);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', data);
  }
  liste() {
    return this.http.get<any[]>(this.apiUrl + '/liste');
  }
  DemandeConges(data: any) {
    return this.http.post<any>(this.apiUrl + '/demande', data);
  }
  ListeD(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + '/demandes_conges');
  }

  accepterConge(id_demande: number) {
    return this.http.post(this.apiUrl + '/accepter_conge', { id_demande });
  }
  refuseConge(id_demande: number) {
    return this.http.post(this.apiUrl + '/refuser_conge', { id_demande });
  }
  deleteEmployee(id_demande: number) {
    return this.http.delete(this.apiUrl + '/employe/' + id_demande);
  }
  employe(id_employe: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/employees/' + id_employe);
  }

  public modifierEmploye(id_employe: number, donnes: any): Observable<any> {
    return this.http.post(this.apiUrl + `/modifier/${id_employe}`, donnes);
  }
}
