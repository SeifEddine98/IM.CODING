import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit, OnDestroy {
  seance: any = {};
  date_d: any = {};
  date_f: any = {};
  formation_id: any;
  formations: any[] = []; 
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
  this.seance.date_debut=new Date(this.date_d).toISOString();
      this.seance.date_fin=new Date(this.date_f).toISOString();
      console.log(this.seance);
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir ajouter cette séance ?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.gestionnaireService.addSeance(this.formation_id,this.seance).subscribe(result => {
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
