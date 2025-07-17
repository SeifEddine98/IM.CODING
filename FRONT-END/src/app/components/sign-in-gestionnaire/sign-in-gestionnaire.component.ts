import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-gestionnaire',
  templateUrl: './sign-in-gestionnaire.component.html',
  styleUrls: ['./sign-in-gestionnaire.component.css']
})
export class SignInGestionnaireComponent {
  userName!: string;
  password!: string;
    hide = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) {
    }
    formControl2 = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
    ]);
    onSubmit() {
    
          this.authenticationService.loginG(this.userName,this.password).subscribe((data: any) => {
            console.log(data);
             this.authenticationService.setTypeOfUser('gestionnaire');
            this._snackBar.open('Authentification effectuée avec succès', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.router.navigateByUrl("/MenuGestionnaire");
          },
          err => {
            console.log(err);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Echec authentification',
          message: 'Authentification impossible ! merci de vérifier votre E-mail et/ou Mot de passe.',
        },
      });
          });
       
    }
}
