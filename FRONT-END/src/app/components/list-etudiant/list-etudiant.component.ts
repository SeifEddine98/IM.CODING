import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})

export class ListEtudiantComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  etudiants: any[] = [];
  filteredEtudiants: any[] = [];
  searchCin!:  number;
  etudiant: any = {};
  formation: any = {};
  formations: any[] = [];
  formation_id!: number;
  etudiantToUpdate: any = {};
  isShown = false;
  isShown2 = false;
  modifierButton!: HTMLButtonElement;
  presences: any[] = [];
  nbSeances!: number;
  nbPresences!: number;
  nbAbsences!: number;
  assuid!: number;
  assidute: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) {
    }
    filterEtudiants(): any[] {
      return this.etudiants.filter(etudiant => etudiant.cin.toString().indexOf(this.searchCin.toString()) !== -1);
    }
  
    onSearchInput() {
      this.filteredEtudiants = this.filterEtudiants();
    }
    
    all() {
      this.gestionnaireService.getAllEtudiants().subscribe(data => {
        this.etudiants = data;
        this.filteredEtudiants = this.etudiants;
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
  
  getEtudiantbyId(id: any){
    this.gestionnaireService.getEtudiantById(id).subscribe(data => {
      this.etudiantToUpdate = data;
    });
    this.isShown2 = false;
    this.isShown = true;
   
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
  getPresenceByEtudiant(etudiant_id: any){
    this.nbAbsences=0;
    this.nbPresences=0;
    this.nbSeances=0;
    this.assuid=0;
    this.gestionnaireService.getPresenceByEtudiant(etudiant_id).subscribe(data => {
      this.presences = data;
    });  
    this.isShown = false;
    this.isShown2 = true;
    setTimeout(() => {
      for(let i=0; i<this.presences.length; i++) {
        if(this.presences[i].present) {
          this.nbPresences++;
        } else {
          this.nbAbsences++;
        }
        this.nbSeances++;
      }
      this.assuid=(this.nbPresences/this.nbSeances)*100;
      this.assidute = this.getAssuiditePhrase(this.assuid);
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 500);
  }
  getAssuiditePhrase(assuid: number): { phrase: string, couleur: string } {
    if (assuid < 26) {
      return { phrase: 'Très peu assidu', couleur: '#8B0000' }; // Rouge foncé
    } else if (assuid < 50) {
      return { phrase: 'Peu assidu', couleur: '#FF4500' }; // Rouge clair
    } else if (assuid < 75) {
      return { phrase: 'Bien assidu', couleur: '#008000' }; // Vert foncé
    } else if (assuid < 100) {
      return { phrase: 'Très bien assidu', couleur: '#32CD32' }; // Vert clair
    } else {
      return { phrase: 'Assiduité parfaite', couleur: '#006400' }; // Vert très foncé
    }
  }
  downloadPDF() {
    const data = document.getElementById('pdf-content');
    if (!data) {
      return;
    }
  
    const tableWidth = data.offsetWidth;
    const tableHeight = data.offsetHeight;
  
    const imgWidth = tableWidth;
    const imgHeight = tableHeight;
  
    const pdf = new jsPDF('l', 'pt', [imgWidth, imgHeight]);
    const options = {
      background: '#fff',
      scale: 2
    };
  
    html2canvas(data, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
      pdf.save('assiduite.pdf');
    });
  }
  
  
  supprimer(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet étudiant ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gestionnaireService.deleteEtudiant(id).subscribe((data: any) => {
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
        message: 'Suppression impossible! merci de supprimer les données associées à cet étudiant.',
      },
    });
        });
      }
    });
  }
  
  onSubmit(etudiant: any, id: any, formation_id: number) {
    console.log(this.etudiantToUpdate);
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gestionnaireService.updateEtudiant(id,etudiant,formation_id).subscribe(result => {
          console.log(result);
          this._snackBar.open('Modification effectuée avec succès', '', {
            duration: 10000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          window.location.reload();
        }, error => { 
          console.error(error);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Echec de modification',
              message: 'Modification impossible! Le numéro de cin ou email introduit existe déjà !',
              okLabel: 'Ok'
            },
            disableClose: true
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
        this.isShown2=false;

      }
    });
  }
    formControl2 = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
    ]);
    formControl = new FormControl('', [Validators.required, this.eightDigitsValidator]);
    formControl4 = new FormControl('', [Validators.required, this.eightDigitsValidator]);

    eightDigitsValidator(control: FormControl): { [key: string]: any } | null {
      const value = control.value;
      const isEightDigits = /^\d{8}$/.test(value);
      return isEightDigits ? null : { 'eightDigits': true };
    }
  
    
  
}

