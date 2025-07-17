import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AdministrateurService } from '../../services/administrateur.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile-ag',
  templateUrl: './update-profile-ag.component.html',
  styleUrls: ['./update-profile-ag.component.css']
})
export class UpdateProfileAGComponent implements OnInit, OnDestroy {
  hide = true;
  sub: Subscription = new Subscription;
  gestionnaireToUpdate: any = {};
  gestionnaireTosent: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private administrateurService: AdministrateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService) { 
    
    }
    all() {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
      this.gestionnaireService.getGestionnaireByEmail(email).subscribe(data => {
        this.gestionnaireToUpdate = data;
        console.log(this.gestionnaireToUpdate);
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.all();
  }
  
  formControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
  ]);
  formControl = new FormControl('', [Validators.required, this.eightDigitsValidator]);
  formControl4 = new FormControl('', [Validators.required, this.eightDigitsValidator]);

  eightDigitsValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const isEightDigits = /^\d{8}$/.test(value);
    return isEightDigits ? null : { 'eightDigits': true };
  }

  formControl3 = new FormControl('', [Validators.required, this.minimumTenCharactersValidator, this.passwordComplexityValidator]);

  minimumTenCharactersValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const hasMinimumTenCharacters = value && value.length >= 10;
    return hasMinimumTenCharacters ? null : { 'minimumTenCharacters': true };
  }
  passwordComplexityValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^\w\s]/.test(value);
    const isValid = hasUppercase && hasLowercase && hasNumber && hasSymbol;
    return isValid ? null : { 'passwordComplexity': true };
  }
  annuler(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir annuler ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl("/MenuGestionnaire")
        
      }
    });
  }
   onSubmit(gestionnaire: any,id: any) {
    console.log(gestionnaire);
    this.gestionnaireTosent.cin=gestionnaire.cin;
    this.gestionnaireTosent.nom=gestionnaire.nom;
    this.gestionnaireTosent.prenom=gestionnaire.prenom;
    this.gestionnaireTosent.adresse=gestionnaire.adresse;
    this.gestionnaireTosent.dateNaiss=gestionnaire.dateNaiss;
    this.gestionnaireTosent.email=gestionnaire.email;
    this.gestionnaireTosent.mdp=gestionnaire.mdp;
    this.gestionnaireTosent.telephone=gestionnaire.telephone;
    console.log(this.gestionnaireTosent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.administrateurService.updateGestionnaire(this.gestionnaireTosent,id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Modification effectuée avec succès', '', {
            duration: 10000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigateByUrl("/MenuGestionnaire")
        }, error => { 
          console.error(error);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Echec de modification',
              message: 'Modification impossible! Le numéro de cin ou email introduit existe déjà !',
              okLabel: 'Ok'
            },
            disableClose: true
          });
        });
      }
    });
  }
}
