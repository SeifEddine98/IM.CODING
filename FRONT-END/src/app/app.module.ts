import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFormateurComponent } from './components/add-formateur/add-formateur.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from 'mat-timepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
//import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddGestionnaireComponent } from './components/add-gestionnaire/add-gestionnaire.component';
import { SignInAdminComponent } from './components/sign-in-admin/sign-in-admin.component';
import { SignInGestionnaireComponent } from './components/sign-in-gestionnaire/sign-in-gestionnaire.component';
import { SignInFormateurComponent } from './components/sign-in-formateur/sign-in-formateur.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { AddSeanceComponent } from './components/add-seance/add-seance.component';
import { AddEtudiantComponent } from './components/add-etudiant/add-etudiant.component';
import { AddFactureComponent } from './components/add-facture/add-facture.component';
import { AddPresenceComponent } from './components/add-presence/add-presence.component';
import { AddCongeComponent } from './components/add-conge/add-conge.component';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';
import { ListFormationComponent } from './components/list-formation/list-formation.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ListSeanceComponent } from './components/list-seance/list-seance.component';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { ListCongeComponent } from './components/list-conge/list-conge.component';
import { ListFormateurComponent } from './components/list-formateur/list-formateur.component';
import { ListGestionnaireComponent } from './components/list-gestionnaire/list-gestionnaire.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { MenuFormateurComponent } from './components/menu-formateur/menu-formateur.component';
import { MenuGestionnaireComponent } from './components/menu-gestionnaire/menu-gestionnaire.component';
import { MenuAdministrateurComponent } from './components/menu-administrateur/menu-administrateur.component';
import { NavbarSignInComponent } from './layout/navbar-sign-in/navbar-sign-in.component';
import { UpdateProfileAGComponent } from './components/update-profile-ag/update-profile-ag.component';
import { UpdateProfileFComponent } from './components/update-profile-f/update-profile-f.component';
import { UpdatePhotoProfilGComponent } from './components/update-photo-profil-g/update-photo-profil-g.component';
import { UpdatePhotoProfilFComponent } from './components/update-photo-profil-f/update-photo-profil-f.component';
import { UpdateProfileAComponent } from './components/update-profile-a/update-profile-a.component';
import { UpdatePhotoProfilAComponent } from './components/update-photo-profil-a/update-photo-profil-a.component';
import { ListSeanceFComponent } from './components/list-seance-f/list-seance-f.component';
import { ListCongeFComponent } from './components/list-conge-f/list-conge-f.component';
import { AuthGuard } from './auth.guard';
import { FormateurGuard } from './formateur.guard';
import { GestionnaireGuard } from './gestionnaire.guard';
import { AdminGuard } from './admin.guard';
import { MenuBeginComponent } from './components/menu-begin/menu-begin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    AddFormateurComponent,
    NavbarComponent,
    AddAdminComponent,
    AddGestionnaireComponent,
    SignInAdminComponent,
    SignInGestionnaireComponent,
    SignInFormateurComponent,
    AddFormationComponent,
    AddSeanceComponent,
    AddEtudiantComponent,
    AddFactureComponent,
    AddPresenceComponent,
    AddCongeComponent,
    ListEtudiantComponent,
    ListFormationComponent,
    ConfirmDialogComponent,
    ListSeanceComponent,
    ListFactureComponent,
    ListCongeComponent,
    ListFormateurComponent,
    ListGestionnaireComponent,
    ListAdminComponent,
    MenuFormateurComponent,
    MenuGestionnaireComponent,
    MenuAdministrateurComponent,
    NavbarSignInComponent,
    UpdateProfileAGComponent,
    UpdateProfileFComponent,
    UpdatePhotoProfilGComponent,
    UpdatePhotoProfilFComponent,
    UpdateProfileAComponent,
    UpdatePhotoProfilAComponent,
    ListSeanceFComponent,
    ListCongeFComponent,
    MenuBeginComponent,
    AdminDashboardComponent,
  ],
  imports: [
    MatMenuModule,
    BrowserModule,
    MatDialogModule,
    MatRadioModule,
    MatToolbarModule,
    MatSelectModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
   // MatFileUploadModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [AuthGuard,FormateurGuard,GestionnaireGuard,AdminGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
