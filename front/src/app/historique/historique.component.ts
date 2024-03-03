import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
})
export class HistoriqueComponent {
  public historique: any[] = [];
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient
      .get('http://localhost:3001/historique')
      .subscribe((data: any) => {
        this.historique = data.historique;
      });
  }
}
