import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCrService } from '../service-cr.service';

@Component({
  selector: 'app-demandeconges',
  templateUrl: './demandeconges.component.html',
  styleUrls: ['./demandeconges.component.css'],
})
export class DemandecongesComponent {
  public id: number = 0;
  public nom: string = '';
  public prenom: string = '';

  public types: string[] = [
    'repos',
    'maladie',
    'administratif',
    'accompagnement',
    'mariage',
    'circonsition',
    'demenagement',
    'deces',
    'naissance enfant',
    'maternite',
    'conge ss solde',
    'autre',
  ];

  public data = {
    datedebut: '',
    datefin: '',
    motif: '',
    id: 0,
    nom: '',
    prenom: '',
    typeConge: '',
  };

  public erreur: string = '';

  constructor(
    private apiService: ServiceCrService,
    private readonly router: Router
  ) {
    let compte = JSON.parse(localStorage.getItem('compte')!);
    this.data.id = compte.id_employe;
    this.data.nom = compte.nom;
    this.data.prenom = compte.prenom;
  }

  Demande() {
    if (!this.data.datedebut || !this.data.datefin || !this.data.typeConge)
      return alert('tous les champs sont obligatoires');
    let compte = JSON.parse(localStorage.getItem('compte')!);
    console.log(this.data);
    this.apiService
      .DemandeConges({ ...this.data, genre: compte.genre })
      .subscribe(
        (response) => {
          console.log(response);
          alert('Demande envoyer avec succes');
          if (this.data) {
            if (compte.poste == 'admin') this.router.navigate(['/admin']);
            else this.router.navigate(['/accueil']);
          }
        },
        (error) => {
          console.log(error);

          this.erreur = error.error.msg;
        }
      );
  }
}
