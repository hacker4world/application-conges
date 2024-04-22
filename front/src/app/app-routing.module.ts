import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';
import { EmployeComponent } from './employe/employe.component';
import { HistoriqueComponent } from './historique/historique.component';
import { SoldeComponent } from './solde/solde.component';
import { DemandecongesComponent } from './demandeconges/demandeconges.component';
import { ListeEComponent } from './liste-e/liste-e.component';
import { ModifierComponent } from './modifier/modifier.component';
import { SupprimerComponent } from './supprimer/supprimer.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create', component: CreateComponent },
  { path: 'employe', component: EmployeComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'solde', component: SoldeComponent },
  { path: 'demandeconges', component: DemandecongesComponent },
  { path: 'create', component: CreateComponent },
  { path: 'liste', component: ListeEComponent },
  { path: 'modifier/:id', component: ModifierComponent },
  { path: 'supprimer/:id', component: SupprimerComponent },
  { path: 'validation', component: ValidationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
