import { Component } from '@angular/core';
import { ServiceCrService } from '../service-cr.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent {
  public employes: any[] = [];
  constructor(public service: ServiceCrService) {
    this.service.ListeD().subscribe((data) => {
      console.log(data);
      data = data.filter((e: any) => e.statut == 'En-attente');
      this.employes = data.map((e: any) => {
        console.log(e);
        if (e.datedebut && e.datefin) {
          e.datedebut = e.datedebut.slice(0, e.datedebut.indexOf('T'));
          e.datefin = e.datefin.slice(0, e.datefin.indexOf('T'));
        }
        return e;
      });
    });
  }

  public ref(id_demande: number) {
    this.service.refuseConge(id_demande).subscribe(() => {
      this.employes = this.employes.filter((e) => e.id_demande != id_demande);
    });
  }
  public acc(id_demande: number) {
    this.service.accepterConge(id_demande).subscribe(() => {
      this.employes = this.employes.filter((e) => e.id_demande != id_demande);
    });
  }
}
