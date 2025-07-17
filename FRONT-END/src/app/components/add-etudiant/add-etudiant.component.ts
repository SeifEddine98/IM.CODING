import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit, OnDestroy {
  hide = true;
  hide2 = true;
  sub: Subscription = new Subscription;
  etudiant: any = {};
  formations: any[] = [];
  a:string="" ;
  formationId!: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {
    }
    all(){
      this.gestionnaireService.getAllFormations1().subscribe(data => {
        this.formations = data;
        
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
      console.log(this.etudiant);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir ajouter cet étudiant ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gestionnaireService.addEtudiant(this.formationId,this.etudiant).subscribe(result => {
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
