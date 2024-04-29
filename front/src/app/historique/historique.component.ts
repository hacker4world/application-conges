import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
})
export class HistoriqueComponent {
  public historique: any[] = [];
  public role: string = '';
  constructor(private readonly httpClient: HttpClient) {
    let user = JSON.parse(localStorage.getItem('compte')!);
    let url =
      user.poste == 'admin'
        ? 'http://localhost:3001/tous-historique'
        : `http://localhost:3001/historique/${user.id_employe}`;
    this.httpClient.get(url).subscribe((data: any) => {
      this.historique = data.historique;
      console.log(this.historique);
      let role = JSON.parse(localStorage.getItem('compte')!).poste;
      this.role = role;
    });
  }
}
