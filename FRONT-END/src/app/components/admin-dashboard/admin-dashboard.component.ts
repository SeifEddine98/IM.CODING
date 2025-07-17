import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnaireService } from '../../services/gestionnaire.service';
import { AdministrateurService } from '../../services/administrateur.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription;
  formations: any[] = [];
  formateurs: any[] = [];
  TF: any = {};
  TFP: any = {};
  TFPP: any = {};
  TFNP: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gestionnaireService: GestionnaireService,
    private administrateurService: AdministrateurService
    ) {
    }
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
    ngOnInit() {
      this.GetAllFormations();
      this.GetAllFormateurs();
      this.GetAllFactures();
      setTimeout(() => {
        this.generateHistogram();
      }, 3000); 
    }
    GetAllFormations() {
      this.gestionnaireService.getAllFormations1().subscribe(data => {
        this.formations = data;
        for (const formation of this.formations) {
          this.administrateurService.NbEtudiantsParFormation(formation.id).subscribe(
            (nbEtudiants) => {
              formation.nbEtudiants = +nbEtudiants;
        
              // Vérifiez si toutes les requêtes sont terminées avant de trier les formations
              if (this.formations.every((f) => f.nbEtudiants !== undefined)) {
                this.formations.sort((a, b) => b.nbEtudiants - a.nbEtudiants);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
    }
    GetAllFormateurs() {
      this.gestionnaireService.getAllFormateurs().subscribe(data => {
        this.formateurs = data;
        for (const formateur of this.formateurs) {
          this.administrateurService.NbCongesFormateur(formateur.id).subscribe(
            (nbConges) => {
              formateur.nbConges = +nbConges;
        
              // Vérifiez si toutes les requêtes sont terminées avant de trier les formations
              if (this.formateurs.every((f) => f.nbConges !== undefined)) {
                this.formateurs.sort((a, b) => a.nbConges - b.nbConges);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
    }
    GetAllFactures() {
      this.administrateurService.NbTotalFactures().subscribe(data => {
        this.TF = data;
      },
    );
          this.administrateurService.NbTotalFacturesPayees().subscribe(data => {
            this.TFP = data;
          },
        );
              this.administrateurService.NbTotalFacturesPartiellemntPayees().subscribe(data => {
                this.TFPP = data;
              },
            );
                  this.administrateurService.NbTotalFacturesNonPayees().subscribe(data => {
                    this.TFNP = data;
                  },
                );
    }
    downloadPDFFormation() {
      const data = document.getElementById('pdf-content-formation');
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
    
        pdf.save('Classement-formation.pdf');
      });
    }
    downloadPDFFormateur() {
      const data = document.getElementById('pdf-content-formateur');
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
    
        pdf.save('Classement-formateur.pdf');
      });
    }
      downloadPDFFacture() {
      const data = document.getElementById('pdf-content-facture');
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
    
        pdf.save('Stats-factures.pdf');
      });
    }
    generateHistogram() {
      const canvas = document.getElementById('histogram') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
    
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total des factures', 'Factures payées', 'Factures partiellement payées', 'Factures non payées'],
            datasets: [{
              label: 'Statistiques des factures',
              data: [this.TF, this.TFP, this.TFPP, this.TFNP],
              backgroundColor: ['#0000FF', '#00FF00', '#FFA500', '#FF0000']
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
    
    
}
