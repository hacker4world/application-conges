import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent {
  constructor(private readonly router: Router) {}

  public logout(): void {
    localStorage.removeItem('compte');
    this.router.navigate(['../login']);
  }
}
