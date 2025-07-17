import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-conge',
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.css']
})
export class ListCongeComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  conges: any[] = [];
  filteredConges: any[] = [];
  searchtNom!:  string;
  formateurs: any[] = [];
  congeToUpdate: any = {};
  congeTosent: any = {};
  isShown = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) {
    }
    filterConges(): any[] {
      return this.conges.filter(conge => conge.formateur.nom.toString().indexOf(this.searchtNom.toString()) !== -1);
    }
  
    onSearchInput() {
      this.filteredConges = this.filterConges();
    }
    
    all() {
      this.gestionnaireService.getAllConges().subscribe(data => {
        this.conges = data;
        console.log(this.conges);
        this.filteredConges = this.conges;
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.all();
  }
  
  getCongebyId(id: any){
    this.gestionnaireService.getCongeById(id).subscribe(data => {
      this.congeToUpdate = data;
    });
    this.isShown = true;
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
  downloadJustificatif(id: any){
    this.gestionnaireService.downloadJustificatif(id);
  }
 
  supprimer(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette demande de congé ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gestionnaireService.deleteConge(id).subscribe((data: any) => {
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
        message: 'Suppression impossible! merci de supprimer les données associées à cette demande de congé.',
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
  onSubmit(conge_id: any, conge: any) {
    console.log(conge);
    this.congeTosent.valide=conge.valide;
    this.congeTosent.reponse=conge.reponse;
    console.log(this.congeTosent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter cette décision ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.validerConge(conge_id,this.congeTosent).subscribe(result => {
          console.log(result);
          this._snackBar.open('Décision effectuée avec succès', '', {
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
