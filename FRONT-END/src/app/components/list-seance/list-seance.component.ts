import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-seance',
  templateUrl: './list-seance.component.html',
  styleUrls: ['./list-seance.component.css']
})
export class ListSeanceComponent {
  sub: Subscription = new Subscription;
  seances: any[] = [];
  filteredSeances: any[] = [];
  searchTitre!:  string;
  formations: any[] = [];
  formation_id!: number;
  SeanceToUpdate: any = {};
  isShown = false;
  d_d: any = {};
  d_f: any = {};
  triDate: Date | undefined;
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
    filterSeances(): any[] {
      const CtriDate = this.datePipe.transform(this.triDate, 'yyyy-MM-dd');
    console.log(CtriDate);
      return this.seances.filter(seance => {
        const dateDebut = this.datePipe.transform(seance.date_debut, 'yyyy-MM-dd');
        console.log(dateDebut);
        return (
          dateDebut === CtriDate
        );
      });
    }
    filterSeances2(): any[] {
      return this.seances.filter(seance => seance.titre.toString().indexOf(this.searchTitre.toString()) !== -1);
    }
    resetFilter() {
      this.triDate = undefined;
      this.all();
    }
    onSearchInput() {
      this.filteredSeances = this.filterSeances();
    }
    onSearchInput2() {
      this.filteredSeances = this.filterSeances2();
    }
    
    all() {
      this.gestionnaireService.getAllSeances().subscribe(data => {
        this.seances = data;
        console.log(this.seances);
        this.filteredSeances = this.seances;
      });
    }
    allF() {
      this.gestionnaireService.getAllFormations1().subscribe(data => {
        this.formations = data;
      });
    }
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.allF();
    this.all();
  }
  getDate(dateTimeStr: string): {date: Date, time: Date} {
    const dateTime = new Date(dateTimeStr);
    const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    const time = new Date(0, 0, 0, dateTime.getHours(), dateTime.getMinutes(), 0);
    return {date, time};
  }
  
  getSeancebyId(id: any){
    this.gestionnaireService.getSeanceById(id).subscribe(data => {
      this.SeanceToUpdate = data;
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
        this.gestionnaireService.deleteSeance(id).subscribe((data: any) => {
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
        message: 'Suppression impossible! merci de supprimer les données associées à cette séance.',
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
  onSubmit(seance: any, id: any, formation_id: number) {
    console.log(seance);
    seance.date_debut=new Date(this.d_d).toISOString();
    seance.date_fin=new Date(this.d_f).toISOString();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.updateSeance(seance,id,formation_id).subscribe(result => {
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


