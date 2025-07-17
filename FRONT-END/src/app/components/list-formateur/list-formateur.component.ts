import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-formateur',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css']
})
export class ListFormateurComponent implements OnInit, OnDestroy {
  photo_profile: File=new File([], "");
  hide = true;
  hide2 = true;
  a:string="" ;
  selectedFileName: any;  
  sub: Subscription = new Subscription;
  formateurs: any[] = [];
  filteredFormateurs: any[] = [];
  searchtName!:  string;
  formateurToUpdate: any = {};
  formateurTosent: any = {};
  isShown = false;
  isShown2 = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,) { 
    
    }

   filterFormateurs(): any[] {
      return this.formateurs.filter(formateur => formateur.nom.toString().indexOf(this.searchtName.toString()) !== -1);
    }
  
    onSearchInput() {
      this.filteredFormateurs = this.filterFormateurs();
    }
    
    all() {
      this.gestionnaireService.getAllFormateurs().subscribe(data => {
        this.formateurs = data;
        console.log(this.formateurs);
        this.filteredFormateurs = this.formateurs;
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.all();
  }
  
  getFormateurbyId(id: any){
    this.gestionnaireService.getFormateurById(id).subscribe(data => {
      this.formateurToUpdate = data;
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
  getFormateurbyId2(id: any){
    this.gestionnaireService.getFormateurById(id).subscribe(data => {
      this.formateurToUpdate = data;
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
    return this.gestionnaireService.getImageUrl(id);
  }
  
 
  supprimer(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce formateur ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gestionnaireService.deleteFormateur(id).subscribe((data: any) => {
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
        message: 'Suppression impossible! merci de supprimer les données associées à ce formateur.',
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
          this.isShown2=false;
          this.isShown=false;
          
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
  updatePhotoFormateur(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.updatePhotoFormateur(this.photo_profile,id).subscribe(result => {
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

