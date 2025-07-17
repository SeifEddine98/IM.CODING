import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { FormateurService } from '../../services/formateur.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-conge-f',
  templateUrl: './list-conge-f.component.html',
  styleUrls: ['./list-conge-f.component.css']
})
export class ListCongeFComponent implements OnInit {
  sub: Subscription = new Subscription;
  conges: any[] = [];
  congeToUpdate: any = {};
  isShown = false;
  formateurToUpdate: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService
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
    
            return this.formateurService.getCongeByFormateur(this.formateurToUpdate.id);
          })
        )
        .subscribe((data) => {
          this.conges = data;
          console.log(this.conges);
        });
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
 
  annuler(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir fermer ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isShown=false;
        
      }
    });
  }
    
}
