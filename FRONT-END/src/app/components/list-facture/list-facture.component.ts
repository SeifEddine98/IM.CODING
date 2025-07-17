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
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  factures: any[] = [];
  filteredFactures: any[] = [];
  searchtNom!:  string;
  formations: any[] = [];
  etudiant_id!: number;
  factureToUpdate: any = {};
  paiement: any = {};
  isShown = false;
  isShown2 = false;
  isShown4P = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) {
    }
  filterFacture(): any[] {
    return this.factures.filter(facture => facture.etudiant.nom.toString().indexOf(this.searchtNom.toString()) !== -1);
  }

  onSearchInput() {
    this.filteredFactures = this.filterFacture();
  }
  
  all() {
    this.gestionnaireService.getAllFactures().subscribe(data => {
      this.factures = data;
      console.log(this.formations);
      this.filteredFactures = this.factures;
    });
  }
  allF() {
    this.gestionnaireService.getAllFormations().subscribe(data => {
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

getFacturebyId(id: any){
  this.gestionnaireService.getFactureById(id).subscribe(data => {
    this.factureToUpdate = data;
  });
  this.isShown = true;
  this.isShown4P = false;
  this.isShown2 = false;

  setTimeout(() => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 0);
}
getFacturebyId4P(id: any){
  this.gestionnaireService.getFactureById(id).subscribe(data => {
    this.factureToUpdate = data;
  });
  this.isShown4P = true;
  this.isShown = false;
  this.isShown2 = false;

  setTimeout(() => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 0);
}
getFacturebyId4Print(id: any){
  this.gestionnaireService.getFactureById(id).subscribe(data => {
    this.factureToUpdate = data;
  });
  this.isShown4P = false;
  this.isShown = false;
  this.isShown2 = true;

  setTimeout(() => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 0);
}
Payer(facture_id: number, paiement: any) {
  console.log(paiement);
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir effectuer ce paiement ?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.gestionnaireService.addPaiement(facture_id,paiement).subscribe(result => {
        console.log(result);
        this._snackBar.open('Paiement effectuée avec succès', '', {
          duration: 10000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        window.location.reload();
      }, error => { 
        console.error(error);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Echec de paiement',
              message: 'Paiement impossible! Le montant saisi est supérieur au montant restant de la facture !',
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
      this.isShown4P=false;
      this.isShown2=false;
    }
  });
}
downloadPDF() {
  const data = document.getElementById('pdf-content');
  if (!data) {
    return;
  }
  html2canvas(data).then(canvas => {
    const imgWidth = 300;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    pdf.addImage(contentDataURL, 'PNG', -40, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, 'PNG', -40, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('facture.pdf');
  });
}
onSubmit(facture: any, id: any) {
  console.log(facture);
  if(facture.montant_total===facture.montant_paye+facture.montant_restant)
{
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir apporter ces modifications ?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.gestionnaireService.updateFacture(facture,id).subscribe(result => {
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
else {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Echec de modification ! ',
      message: 'Merci de vérifier que les montants saisis sont complémentaires.'
    }
  });
}
}

}
