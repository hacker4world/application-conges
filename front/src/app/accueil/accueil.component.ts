import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  constructor(private readonly router: Router) {}

  public logout(): void {
    localStorage.removeItem('compte');
    this.router.navigate(['../login']);
  }
}
