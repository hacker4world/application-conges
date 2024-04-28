import { Component } from '@angular/core';
import { ServiceCrService } from '../service-cr.service';

@Component({
  selector: 'app-liste-e',
  templateUrl: './liste-e.component.html',
  styleUrls: ['./liste-e.component.css'],
})
export class ListeEComponent {
  public employes: any[] = [];
  public role: string = '';

  constructor(public service: ServiceCrService) {
    this.service.liste().subscribe((data) => {
      this.employes = data as any[];
      console.log(this.employes);
      let role = JSON.parse(localStorage.getItem('compte')!).poste;
      this.role = role;
    });
  }
}
