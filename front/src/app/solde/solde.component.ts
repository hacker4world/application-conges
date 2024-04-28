import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.css'],
})
export class SoldeComponent {
  public nom: string = '';
  public solde: number = 0;
  public role: string = '';

  constructor(private readonly httpClient: HttpClient) {
    let compte = JSON.parse(localStorage.getItem('compte')!);
    this.nom = compte.nom + ' ' + compte.prenom;
    this.httpClient
      .get(`http://localhost:3001/solde/${compte.id_employe}`)
      .subscribe((data: any) => {
        this.solde = data.solde_conges as number;
        let role = JSON.parse(localStorage.getItem('compte')!).poste;
        this.role = role;
      });
  }
}
