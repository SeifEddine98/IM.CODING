import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurService } from '../../services/administrateur.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-gestionnaire',
  templateUrl: './list-gestionnaire.component.html',
  styleUrls: ['./list-gestionnaire.component.css']
})
export class ListGestionnaireComponent implements OnInit, OnDestroy {
  photo_profile: File=new File([], "");
  hide = true;
  hide2 = true;
  a:string="" ;
  selectedFileName: any;  
  sub: Subscription = new Subscription;
  gestionnaires: any[] = [];
  filteredGestionnaires: any[] = [];
  searchtName!:  string;
  gestionnaireToUpdate: any = {};
  gestionnaireTosent: any = {};
  isShown = false;
  isShown2 = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private administrateurService: AdministrateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,) { 
    
    }

   filterGestionnaires(): any[] {
      return this.gestionnaires.filter(gestionnaire => gestionnaire.nom.toString().indexOf(this.searchtName.toString()) !== -1);
    }
  
    onSearchInput() {
      this.filteredGestionnaires = this.filterGestionnaires();
    }
    
    all() {
      this.administrateurService.getAllGestionnaires().subscribe(data => {
        this.gestionnaires = data;
        console.log(this.gestionnaires);
        this.filteredGestionnaires = this.gestionnaires;
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.all();
  }
  
  getGestionnaireById(id: any){
    this.administrateurService.getGestionnaireById(id).subscribe(data => {
      this.gestionnaireToUpdate = data;
    });
    this.isShown2 = false;
    this.isShown = true;
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
  getGestionnaireById2(id: any){
    this.administrateurService.getGestionnaireById(id).subscribe(data => {
      this.gestionnaireToUpdate = data;
    });
    this.isShown = false;
    this.isShown2 = true;
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
  getImageUrl(id: any): string{
    return this.administrateurService.getImageGestionnaireUrl(id);
  }
  
 
  supprimer(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce gestionnaire ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.administrateurService.deleteGestionnaire(id).subscribe((data: any) => {
          this._snackBar.open('Suppression effectuée avec succès', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          window.location.reload();
        },
        err => {
          console.log(err);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Echec de suppression',
        message: 'Suppression impossible! merci de supprimer les données associées à ce gestionnaire.',
      },
    });
        });
      }
    });
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
    annuler(){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir annuler ces modifications ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isShown2=false;
          this.isShown=false;
          
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
          window.location.reload();
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
  updatePhotoGestionnaire(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.administrateurService.updatePhotoGestionnaire(this.photo_profile,id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Modification effectuée avec succès', '', {
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
