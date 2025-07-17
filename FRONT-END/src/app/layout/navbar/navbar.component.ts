import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AdministrateurService } from '../../services/administrateur.service';
import { FormateurService } from '../../services/formateur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminToUpdate: any = {};
  formateurToUpdate: any = {};
  gestionnaireToUpdate: any = {};
  navPerson: any = {};
  profileImageUrl: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private gestionnaireService: GestionnaireService,
    private administrateurService: AdministrateurService,
    private formateurService: FormateurService) { 
    
    }
    getImageUrl(): void {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
      console.log(this.authService.getUserType())
      if (this.authService.getUserType() === "formateur") {
        this.formateurService.getFormateurByEmail(email).subscribe(data => {
          this.formateurToUpdate = data;
          this.navPerson = data;
          console.log(this.formateurToUpdate);
          this.profileImageUrl = this.gestionnaireService.getImageUrl(this.formateurToUpdate.id);
        });
      } else if (this.authService.getUserType() === "gestionnaire") {
        this.gestionnaireService.getGestionnaireByEmail(email).subscribe(data => {
          this.gestionnaireToUpdate = data;
          this.navPerson = data;
          console.log(this.gestionnaireToUpdate);
          this.profileImageUrl = this.administrateurService.getImageGestionnaireUrl(this.gestionnaireToUpdate.id);
        });
      } else {
        this.administrateurService.getAdminByEmail(email).subscribe(data => {
          this.adminToUpdate = data;
          this.navPerson = data;
          console.log(this.adminToUpdate);
          this.profileImageUrl = this.administrateurService.getImageAdminUrl(this.adminToUpdate.id);
        });
      }
    }
    ngOnInit() {
      this.getImageUrl();
    }

    Deconnecter() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir se déconnecter ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.logout();
        
            this._snackBar.open('Déconnexion effectuée avec succès', '', {
              duration: 10000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.router.navigateByUrl("/MenuBegin");
          }
          });
    }

}
