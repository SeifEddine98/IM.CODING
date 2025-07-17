import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurService } from '../../services/administrateur.service';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-photo-profil-a',
  templateUrl: './update-photo-profil-a.component.html',
  styleUrls: ['./update-photo-profil-a.component.css']
})
export class UpdatePhotoProfilAComponent implements OnInit, OnDestroy {
  photo_profile: File=new File([], "");
  selectedFileName: any;
  adminToUpdate: any = {};
  sub: Subscription = new Subscription;  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private administrateurService: AdministrateurService,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private dialog: MatDialog,) { 
    
    }
    all() {
      const email = this.authService.extractEmailFromToken();
      console.log(email);
      this.administrateurService.getAdminByEmail(email).subscribe(data => {
        this.adminToUpdate = data;
        console.log(this.adminToUpdate);
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
        message: 'Êtes-vous sûr de vouloir annuler ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl("/MenuAdmin")
        
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
  updatePhotoGestionnaire(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.administrateurService.updatePhotoAdmin(this.photo_profile,id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Modification effectuée avec succès', '', {
            duration: 10000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigateByUrl("/MenuAdmin");
        }, error => { 
          console.error(error);
        });
      }
    });
  }
}
