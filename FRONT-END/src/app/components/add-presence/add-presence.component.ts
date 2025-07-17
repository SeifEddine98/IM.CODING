import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../../services/formateur.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-add-presence',
  templateUrl: './add-presence.component.html',
  styleUrls: ['./add-presence.component.css']
})
export class AddPresenceComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  presence!: boolean;
  seances: any[] = [];
  etudiants: any[] = [];
  a:string="" ;
  seanceId: any = {};
  etudiantId: any = {};
  formateurToUpdate: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService
    ) {
    }
    executeInOrder() {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
      
      this.formateurService.getFormateurByEmail(email).subscribe(data => {
        this.formateurToUpdate = data;
        console.log(this.formateurToUpdate);
        
        this.formateurService.getSeanceByFormateur(this.formateurToUpdate.id).subscribe(data => {
          this.seances = data;
          
          this.formateurService.getEtudiantByFormateur(this.formateurToUpdate.id).subscribe(data => {
            this.etudiants = data;
  
          });
        });
      });
    }
    
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  annuler(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir annuler cette opération ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.router.navigate(['/MenuFormateur']);
      }
    });
  }
    ngOnInit() {
     this.executeInOrder();
    }
    onSubmit() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir attribuer ces assuiduitées à ces étudiants ?'
        }
      });
      
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const presences = this.etudiants.map(etudiant => {
            return {
              seance: this.seanceId,
              etudiant: etudiant,
              present: etudiant.present
            };
          });
          this.formateurService.assignerAssiduite(presences).subscribe(result => {
            this._snackBar.open('Assiduitées assignée avec succès !', '', {
              duration: 10000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            window.location.reload();
          }, error => { 
            console.error(error);
          });
        }
      });
    }
    
}
