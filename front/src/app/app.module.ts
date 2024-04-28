import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateComponent } from './create/create.component';
import { SoldeComponent } from './solde/solde.component';
import { EmployeComponent } from './employe/employe.component';
import { AdminComponent } from './admin/admin.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DemandecongesComponent } from './demandeconges/demandeconges.component';
import {HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListeEComponent } from './liste-e/liste-e.component';
import { ModifierComponent } from './modifier/modifier.component';
import { SupprimerComponent } from './supprimer/supprimer.component';
import { ValidationComponent } from './validation/validation.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    CreateComponent,
    SoldeComponent,
    EmployeComponent,
    AdminComponent,
    HistoriqueComponent,
    DemandecongesComponent,
    
    ListeEComponent,
         ModifierComponent,
         SupprimerComponent,
         ValidationComponent,
         AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
