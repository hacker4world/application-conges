import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCrService } from '../service-cr.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  public id: number;
  public nom: string;
  public prenom: string;
  public departement: string;
  public email: string;
  public pwd: string;

  public role: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: ServiceCrService,
    private readonly router: Router
  ) {
    this.id = 0;
    this.nom = '';
    this.prenom = '';
    this.departement = '';
    this.email = '';
    this.pwd = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadEmployeeDetails();
      let role = JSON.parse(localStorage.getItem('compte')!).poste;
      this.role = role;
      console.log(role);
    });
  }

  loadEmployeeDetails(): void {
    this.employeeService.employe(this.id).subscribe((response) => {
      console.log(response);

      this.nom = response.nom;
      this.prenom = response.prenom;
      this.departement = response.departement;
      this.email = response.email;
      this.pwd = response.pwd;
    });
  }

  modifier(): void {
    this.employeeService
      .modifierEmploye(this.id, {
        id: this.id,
        nom: this.nom,
        prenom: this.prenom,
        departement: this.departement,
        email: this.email,
        pwd: this.pwd,
      })
      .subscribe((data) => {
        this.router.navigate(['../liste']);
      });
  }
}
