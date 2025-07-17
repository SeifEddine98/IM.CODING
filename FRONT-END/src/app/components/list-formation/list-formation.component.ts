import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  formations: any[] = [];
  filteredFormations: any[] = [];
  searchtTitre!:  string;
  formation: any = {};
  formateur: any = {};
  formateurs: any[] = [];
  formateur_id!: number;
  formationToUpdate: any = {};
  formationTosent: any = {};
  isShown = false;
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ') ?? '';
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private datePipe: DatePipe
    ) {
    }
    filterFormations(): any[] {
      return this.formations.filter(formation => formation.titre.toString().indexOf(this.searchtTitre.toString()) !== -1);
    }
  
    onSearchInput() {
      this.filteredFormations = this.filterFormations();
    }
    
    all() {
      this.gestionnaireService.getAllFormations1().subscribe(data => {
        this.formations = data;
        console.log(this.formations);
        this.filteredFormations = this.formations;
      });
    }
    allF() {
      this.gestionnaireService.getAllFormateurs().subscribe(data => {
        this.formateurs = data;
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.allF();
    this.all();
  }
  
  getFormationbyId(id: any){
    this.gestionnaireService.getFormationById(id).subscribe(data => {
      this.formationToUpdate = data;
    });
    this.isShown = true;
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
  
 
  supprimer(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gestionnaireService.deleteFormation(id).subscribe((data: any) => {
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
        message: 'Suppression impossible! merci de supprimer les données associées à cette formation.',
      },
    });
        });
      }
    });
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
        this.isShown=false;
        
      }
    });
  }
  onSubmit(formation: any, id: any, formateur_id: number) {
    console.log(formation);
    this.formationTosent.titre=formation.titre;
    this.formationTosent.date_debut=formation.date_debut;
    this.formationTosent.date_fin=formation.date_fin;
    console.log(this.formationTosent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.updateFormation(this.formationTosent,id,formateur_id).subscribe(result => {
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
