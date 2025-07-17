import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormateurComponent } from './components/add-formateur/add-formateur.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddEtudiantComponent } from './components/add-etudiant/add-etudiant.component';
import { AddFactureComponent } from './components/add-facture/add-facture.component';
import { AddSeanceComponent } from './components/add-seance/add-seance.component';
import { AddPresenceComponent } from './components/add-presence/add-presence.component';
import { AddCongeComponent } from './components/add-conge/add-conge.component';
import { AddGestionnaireComponent } from './components/add-gestionnaire/add-gestionnaire.component';
import { SignInAdminComponent } from './components/sign-in-admin/sign-in-admin.component';
import { SignInFormateurComponent } from './components/sign-in-formateur/sign-in-formateur.component';
import { SignInGestionnaireComponent } from './components/sign-in-gestionnaire/sign-in-gestionnaire.component';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';
import { ListFormationComponent } from './components/list-formation/list-formation.component';
import { ListSeanceComponent } from './components/list-seance/list-seance.component';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { ListCongeComponent } from './components/list-conge/list-conge.component';
import { ListFormateurComponent } from './components/list-formateur/list-formateur.component';
import { ListGestionnaireComponent } from './components/list-gestionnaire/list-gestionnaire.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { MenuFormateurComponent } from './components/menu-formateur/menu-formateur.component';
import { MenuGestionnaireComponent } from './components/menu-gestionnaire/menu-gestionnaire.component';
import { MenuAdministrateurComponent } from './components/menu-administrateur/menu-administrateur.component';
import { UpdateProfileAGComponent } from './components/update-profile-ag/update-profile-ag.component';
import { UpdateProfileFComponent } from './components/update-profile-f/update-profile-f.component';
import { UpdatePhotoProfilFComponent } from './components/update-photo-profil-f/update-photo-profil-f.component';
import { UpdatePhotoProfilGComponent } from './components/update-photo-profil-g/update-photo-profil-g.component';
import { UpdateProfileAComponent } from './components/update-profile-a/update-profile-a.component';
import { UpdatePhotoProfilAComponent } from './components/update-photo-profil-a/update-photo-profil-a.component';
import { ListSeanceFComponent } from './components/list-seance-f/list-seance-f.component';
import { ListCongeFComponent } from './components/list-conge-f/list-conge-f.component';
import { MenuBeginComponent } from './components/menu-begin/menu-begin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { FormateurGuard } from './formateur.guard';
import { GestionnaireGuard } from './gestionnaire.guard';
import { AdminGuard } from './admin.guard';






const routes: Routes = [
  { path: 'addFormateur', component: AddFormateurComponent, canActivate: [AuthGuard, GestionnaireGuard] },
  { path: 'addFormation', component: AddFormationComponent, canActivate: [AuthGuard, GestionnaireGuard] },
  {path: 'addAdmin', component: AddAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'addEtudiant', component: AddEtudiantComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'addConge', component: AddCongeComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'addFacture', component: AddFactureComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'addSeance', component: AddSeanceComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'addPresence', component: AddPresenceComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'addGestionnaire', component: AddGestionnaireComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'signInadmin', component: SignInAdminComponent},
  {path: 'signIngest', component: SignInGestionnaireComponent},
  {path: 'signInform', component: SignInFormateurComponent},
  {path: '', component: MenuBeginComponent},
  {path: 'MenuBegin', component: MenuBeginComponent},
  {path: 'ListEtudiant', component: ListEtudiantComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListFormation', component: ListFormationComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListSeance', component: ListSeanceComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListFacture', component: ListFactureComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListConge', component: ListCongeComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListFormateur', component: ListFormateurComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'ListGestionnaire', component: ListGestionnaireComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'ListAdmin', component: ListAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'MenuFormateur', component: MenuFormateurComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'MenuGestionnaire', component: MenuGestionnaireComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'MenuAdmin', component: MenuAdministrateurComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'AdminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'UpdateProfileF', component: UpdateProfileFComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'UpdatePhotoProfilF', component: UpdatePhotoProfilFComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'UpdateProfileAG', component: UpdateProfileAGComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'UpdatePhotoProfilG', component: UpdatePhotoProfilGComponent, canActivate: [AuthGuard, GestionnaireGuard]},
  {path: 'UpdateProfileA', component: UpdateProfileAComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'UpdatePhotoProfilA', component: UpdatePhotoProfilAComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'ListSeanceF', component: ListSeanceFComponent, canActivate: [AuthGuard, FormateurGuard]},
  {path: 'ListCongeF', component: ListCongeFComponent, canActivate: [AuthGuard, FormateurGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
