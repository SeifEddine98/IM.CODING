import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { FormateurService } from '../../services/formateur.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile-f',
  templateUrl: './update-profile-f.component.html',
  styleUrls: ['./update-profile-f.component.css']
})
export class UpdateProfileFComponent implements OnInit, OnDestroy {
  hide = true;
  sub: Subscription = new Subscription;
  formateurToUpdate: any = {};
  formateurTosent: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService) { 
    
    }
    all() {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
      this.formateurService.getFormateurByEmail(email).subscribe(data => {
        this.formateurToUpdate = data;
        console.log(this.formateurToUpdate);
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
    getSousDomaines(domaine: string): string[] {
      switch (domaine) {
        case 'developpement-logiciel':
          return ['Développement web', 'Développement mobile', 'Développement de jeux vidéo'];
        case 'e-commerce':
          return ['Marketing en ligne', 'Gestion des commandes', 'Paiements en ligne'];
        case 'management':
          return ['Gestion de projet', 'Stratégie d\'entreprise', 'Gestion de la qualité'];
        case 'marketing-digital':
          return ['Publicité en ligne', 'Réseaux sociaux', 'E-mail marketing'];
        case 'developpement-ressource-humaine':
          return ['Recrutement', 'Formation', 'Gestion des performances'];
        default:
          return [];
      }
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
        this.router.navigateByUrl("/MenuFormateur")
        
      }
    });
  }
   onSubmit(formateur: any,id: any) {
    console.log(formateur);
    this.formateurTosent.cin=formateur.cin;
    this.formateurTosent.nom=formateur.nom;
    this.formateurTosent.prenom=formateur.prenom;
    this.formateurTosent.adresse=formateur.adresse;
    this.formateurTosent.dateNaiss=formateur.dateNaiss;
    this.formateurTosent.email=formateur.email;
    this.formateurTosent.mdp=formateur.mdp;
    this.formateurTosent.telephone=formateur.telephone;
    this.formateurTosent.domaine=formateur.domaine;
    this.formateurTosent.sousdomaine=formateur.sousdomaine;
    console.log(this.formateurTosent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.updateFormateur(this.formateurTosent,id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Modification effectuée avec succès', '', {
            duration: 10000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigateByUrl("/MenuFormateur")
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

