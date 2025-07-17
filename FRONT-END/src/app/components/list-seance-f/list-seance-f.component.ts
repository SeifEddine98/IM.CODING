import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { FormateurService } from '../../services/formateur.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-seance-f',
  templateUrl: './list-seance-f.component.html',
  styleUrls: ['./list-seance-f.component.css']
})
export class ListSeanceFComponent {
  sub: Subscription = new Subscription;
  seances: any[] = [];
  SeanceToUpdate: any = {};
  isShown = false;
  formateurToUpdate: any = {};
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ') ?? '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private datePipe: DatePipe
    ) {
    }

    all() {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
    
      this.formateurService.getFormateurByEmail(email)
        .pipe(
          switchMap((data) => {
            this.formateurToUpdate = data;
            console.log(this.formateurToUpdate);
    
            return this.formateurService.getSeanceByFormateur(this.formateurToUpdate.id);
          })
        )
        .subscribe((data) => {
          this.seances = data;
          console.log(this.seances);
        });
    }
  
     ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  ngOnInit() {
    this.all();
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
  annuler(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir annuler cette opération ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isShown=false;
        
      }
    });
  }
  onSubmit(seance: any, id: any) {
    console.log(seance);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir écrire ces remarques ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formateurService.updateSeance(seance,id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Remarque(s) enregistrée(s) avec succès', '', {
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


