import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  facture: any = {};
  formations: any[] = [];
  etudiants: any[] = [];
  a:string="" ;
  etudiantId!: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {
    }
    allF(){
      this.gestionnaireService.getAllFormations1().subscribe(data => {
        this.formations = data;
        
      });
    }
     allE(){
      this.gestionnaireService.getAllEtudiants().subscribe(data => {
        this.etudiants = data;
        
      });
    }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

    ngOnInit() {
      this.allF();
      this.allE();
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
      console.log(this.facture);
      if(this.facture.montant_total===this.facture.montant_paye+this.facture.montant_restant){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir ajouter cette facture ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gestionnaireService.addFacture(this.etudiantId,this.facture).subscribe(result => {
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
    else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Echec! ! ',
          message: 'Merci de vérifier que les montants saisis sont complémentaires.'
        }
      });
    }
  }
}

