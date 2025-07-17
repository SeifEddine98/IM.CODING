import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.css']
})
export class AddFormateurComponent implements OnInit, OnDestroy {
  photo_profile: File=new File([], "");
  hide = true;
  hide2 = true;
  sub: Subscription = new Subscription;
  formateur: any = {};
  a:string="" ;
  selectedFileName: any;  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {
    }
    
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

    ngOnInit() {
    }
    
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFileName = input.files![0].name;
    if (event?.target instanceof HTMLInputElement) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.photo_profile = files[0];
      }
    }
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
          message: 'Êtes-vous sûr de vouloir annuler cette opération ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.router.navigate(['/MenuGestionnaire']);
        }
      });
    }
    onSubmit() {
      console.log(this.formateur);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir ajouter ce formateur ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gestionnaireService.addFormateur(this.photo_profile,this.formateur).subscribe(result => {
            console.log(result);
            this._snackBar.open('Ajout effectué avec succès', '', {
              duration: 10000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            window.location.reload();
          }, error => { 
            console.error(error);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Echec !',
                message: 'Ajout impossible! Le numéro de cin ou email introduit existe déjà !',
                okLabel: 'Ok'
              },
              disableClose: true
            });
          });
        }
      });
    }
}
