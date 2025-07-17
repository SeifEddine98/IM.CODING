import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit, OnDestroy {
  formation: any = {};
  formateurs: any[] = [];
  formateur_id!: number;
  formateur_name: any = {}; 
  sub: Subscription = new Subscription;

   constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {
    }
  all(){
    this.gestionnaireService.getAllFormateurs().subscribe(data => {
      this.formateurs = data;
      
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

    ngOnInit() {
      this.all();
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
      console.log(this.formation);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir ajouter cette formation ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gestionnaireService.addFormation(this.formateur_id,this.formation).subscribe(result => {
            console.log(result);
            this._snackBar.open('Ajout effectué avec succès', '', {
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
