import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceCrService } from '../service-cr.service';

@Component({
  selector: 'app-supprimer',
  templateUrl: './supprimer.component.html',
  styleUrls: ['./supprimer.component.css']
})
export class SupprimerComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute, private employeeService: ServiceCrService,private readonly router :Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
  }

  supprimer(): void {
    this.employeeService.deleteEmployee(this.id).subscribe({
      next: (resultat) => {
        alert('Employé supprimé avec succès');
        this.router.navigate(["/liste"]);
      },
      error: (err) => {
        alert('Erreur lors de la suppression de l\'employé');
       
      }
    });
  }
}
