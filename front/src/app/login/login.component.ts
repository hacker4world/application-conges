import { Component } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { ServiceCrService } from '../service-cr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public data = {
    id: '',
    password: '',
  };

  constructor(
    private readonly service: ServiceCrService,
    private readonly router: Router
  ) {}

  login() {
    console.log(this.data);

    this.service.login(this.data).subscribe(
      (data) => {
        if (data) {
          if (data.poste == 'admin') this.router.navigate(['/admin']);
          else this.router.navigate(['/accueil']);
          localStorage.setItem('compte', JSON.stringify(data));
        }
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
}
