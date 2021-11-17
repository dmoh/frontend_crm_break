import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { map } from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface PeriodicElement {
  description: string;
  user: string;
  date: string;
  amount: string;
  tva: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"approved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"appoved"},

];

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})


export class BillingComponent implements OnInit {

  displayedColumns: string[] = ['description', 'user', 'date', 'amount', 'tva', 'status'];
  dataSource = ELEMENT_DATA;
  dd: any;


  constructor() { }

  ngOnInit(): void {
  }
  updateFilter(filter: any) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }

  generatePdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }
  getDocument() {
    return {

      content: [
        {
            text: 'Nom Prénom',
            style: 'header',
        },
        {
          text: 'Adresse',
          style: 'header',
        },
        {
          text: 'Email',
          style: 'header',
        },
        {
          text: 'SIREN',
          style: 'header',
        },
        {
          text: 'Siret',
          style: 'header',
        },
        {
          text: 'Numéro Facture',
          style: 'text1',
          alignment: 'right',
        },
        {
          text: "Nom de l'entreprise",
          style: 'text2',
          alignment: 'right',
          margin: [0, 30, 0, 30],
        },
        {
          text: " Dispensé d’immatriculation au registre du commerce et des sociétés",
          style: 'text3',
          margin: [0, 30, 0, 20],
        },
        {
          text: "Medias maintenance installation de telecom et courant faible",
          style: 'text4',
          margin: [0, 30, 0, 30],
        },
        {
          table: {
            style: 'tab1',
            widths: [125, 125, 125, 125],

            body: [
              ['QUANTITE', 'DESIGNATION', 'PRIX UNITAIRE', 'TOTAL'],
              ['Raccordements', '', '', ''],
            ],
            margin: [0, 0, 0, 25],
          }
        },
        {
          table: {
            style: 'tab2',
            widths: [125, 125],
            alignment: 'right',
            margin: [0, 25, 0, 0],
            body: [
              ['TOTAL', 'PRIX'],
            ],
          }
        },
        {
          text: "TVA non applicable article 293 B du CGI",
          style: 'footer',
        },
      ],
        styles: {
          footer: {
            margin: [0, 40, 0, 0],
            alignment: 'right',
          },
        }
    }
  }
}
