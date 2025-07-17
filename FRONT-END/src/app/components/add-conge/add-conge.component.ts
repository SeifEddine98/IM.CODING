import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../../services/formateur.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css']
})
export class AddCongeComponent implements OnInit, OnDestroy {
  justificatif: File=new File([], "");
  selectedFileName: any;  
  conge: any = {};
  formateurToUpdate: any = {};
  sub: Subscription = new Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService
    ) {
    }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  all() {
    const email = this.authService.extractEmailFromToken();
    console.log(email);
    this.formateurService.getFormateurByEmail(email).subscribe(data => {
      this.formateurToUpdate = data;
      console.log(this.formateurToUpdate);
    });
  }
    ngOnInit() {
      this.all();
    }
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedFileName = input.files![0].name;
      if (event?.target instanceof HTMLInputElement) {
        const files: FileList | null = event.target.files;
        if (files && files.length > 0) {
          this.justificatif = files[0];
        }
      }
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
            this.router.navigate(['/MenuFormateur']);
        }
      });
    }
  
    onSubmit() {
      console.log(this.conge);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Êtes-vous sûr de vouloir déposer cette demande de congé ?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.formateurService.addConge(this.justificatif,this.formateurToUpdate.id,this.conge).subscribe(result => {
            console.log(result);
            this._snackBar.open('Demande déposée avec succès', '', {
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
