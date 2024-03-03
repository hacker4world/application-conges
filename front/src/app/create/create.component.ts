import { Component } from '@angular/core';
import { ServiceCrService } from '../service-cr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  public formData = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    departement: '',
    genre: '',
  };

  constructor(
    private apiService: ServiceCrService,
    private readonly router: Router
  ) {}

  sendDataToBackend() {
    this.apiService.sendFormData(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      function (err) {
        alert(err.error.msg);
      }
    );
  }
}
