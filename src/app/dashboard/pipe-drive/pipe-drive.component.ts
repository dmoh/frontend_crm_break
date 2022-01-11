import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../models/list';
import { Offer } from '../models/offer';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DialogModalComponent } from '@app/dialog-modal/dialog-modal.component';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-pipe-drive',
  templateUrl: './pipe-drive.component.html',
  styleUrls: ['./pipe-drive.component.scss'],
  providers: [MatSnackBar]
})
export class PipeDriveComponent implements OnInit {
  ad: Ad[] = [];
  green = false;
  listLabel = "";
  itemContent: string;
  over = false;
  /*offers: Offer[] = [
    {
      offerName: 'Villa',
      name: "Marc",
      lastName: "Julien",
      amount: 600000
    },

      {
        offerName: 'Hôtel',
        name: "Lopez",
        lastName: "Jennifer",
        amount: 800000
    },
    {
      offerName: 'Commerce',
      name: "Courtois",
      lastName: "Mathieu",
      amount: 50000
    },
    {
      offerName: 'Immeuble paris',
      name: "Sacko",
      lastName: "Mohamed",
      amount: 50000
      },
  ];
  lists: any = [{
    label: 'Prospect identifé',
   offers: [
      {
        offerName: 'Villa',
        name: "Marc",
        lastName: "Julien",
        amount: 600000
      },
    ],
  },
    {
      label: 'Contact effectué',
      offers: [
        {
          offerName: 'Hôtel',
          name: "Lopez",
          lastName: "Jennifer",
          amount: 800000
        }
      ],
    },
    {
      label: 'proposition effectuéé',
      offers: [
        {
          offerName: 'Commerce',
          name: "Courtois",
          lastName: "Mathieu",
          amount: 50000
        },
      ],
    },
    {
      label: 'Négociations',
      offers: [
        {
        offerName: 'Immeuble paris',
        name: "Sacko",
        lastName: "Mohamed",
        amount: 50000
        },
      ],
    }
  ];*/
  basket: any[];
  offreAttente: any[] = [];
  columns: any[] = [
    {
      titre: 'Teaser',
      colorBox: 'redBox',
      color: 'red',
      offre:
        [
          {
            offerName: 'Immeuble',
            name: 'Sacko',
            lastName: "Mohamed",
            amount: 50000
          },
        ],
    },
    {
      titre: 'Mémorandum / Dossier complet',
      colorBox: 'blueBox',
      color: 'blue',
      offre:
        [
          {
            offerName: 'Commerce',
            name: 'Courtois',
            lastName: "Mathieu",
            amount: 50000
          },
        ],
    },
    {
      titre: 'Offre Indicative',
      colorBox: 'orangeBox',
      color: 'orange',
      offre: [
        {
          offerName: 'Hôtel',
          name: 'Lopez',
          lastName: "Jennifer",
          amount: 800000
        },
      ],
    },
    {
      titre: 'Due Diligence / Visites',
      colorBox: 'greenBox',
      color: 'green',
      offre: [
        {
          offerName: 'Villa',
          name: 'Marc',
          lastName: 'Julien',
          amount: 600000
        },
      ],
    },
    {
      titre: 'Offre Ferme',
      colorBox: 'tealBox',
      color: 'teal',
      offre: [
        {
          offerName: 'Villa',
          name: 'Marc',
          lastName: 'Julien',
          amount: 600000
        },
      ],
    },
    {
      titre: 'Closing / Signature',
      colorBox: 'purpleBox',
      color: 'purple',
      offre: [
        {
          offerName: 'Villa',
          name: 'Marc',
          lastName: 'Julien',
          amount: 600000
        },
      ],
    },
]
  offres: any[] = [

    {
      titre: 'Prospect identifié',
      colorBox: 'redBox',
      color: 'red',
      offre:
        [
          {
                offerName: 'Immeuble',
                name: 'Sacko',
                lastName: "Mohamed",
                amount: 50000
              },
        ],
    },
    {
      titre: 'Contact effectué',
      colorBox: 'blueBox',
      color: 'blue',
      offre:
        [
          {
            offerName: 'Commerce',
            name: 'Courtois',
            lastName: "Mathieu",
            amount: 50000
          },
      ],


    },
    {
      titre: 'Proposition effectuée',
      colorBox: 'orangeBox',
      color: 'orange',
      offre: [
        {
          offerName: 'Hôtel',
          name: 'Lopez',
          lastName: "Jennifer",
          amount: 800000
        },
      ],

    },
    {
      titre: "Négociations",
      colorBox: 'greenBox',
      color: 'green',
      offre: [
        {
          offerName: 'Villa',
          name: 'Marc',
          lastName: 'Julien',
          amount: 600000
        },
      ],


    },
  ];
  drag = false;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  hoverBasket() {
    //this.over = true;
  }
  openOfferModal(): void {
    //let tab;
    const dialogRef = this.dialog.open(OfferModalComponent, {
      width: '50%',
      data: new Ad(),
    });
    console.log('je suis dans le container')
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.container.id === "cdk-drop-list-14") {
        this.openOfferModal();
        console.log('je suis dans le container')
    }


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }
    console.log("event", event);

  }
  dropCard($event) {
    //this.basket.push($event)
    console.log('event',$event)
  }

  openDialog(): void {
    //let tab;
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '50%',
      data: new Ad (),
    });
    dialogRef.afterClosed().subscribe(offer => {

      if (offer) {
        console.log('offer', offer)

        //this.offers.push(offer)
        /*this.offres.forEach((elt) => {
          if (elt.titre === offer.titre) {
            elt.offre.push(offer)
          }
          return this.offres
        })*/
        //this.offreAttente.push(offer)
        //this.ad = [...this.ad, ...offer]
        this.ad.push(offer)
        console.log('ad offre', this.ad)
       //this.snackBar.open('Offre Ajoutée', 'Annulé', { duration: 2000 });
      }

    })
  }
  ngOnInit(): void {
    this.basket = this.offres.map((item) => {
      return item.offre
    })
    console.log("basket", this.basket)
  }


 /* switchCard($event: {
      src: { itemIndex: number, listIndex: number},
      dst: { itemIndex:number, listIndex: number }
    }): void {
    [
      this.offers[$event.src.itemIndex],
      this.offers[$event.dst.itemIndex]
    ] = [
      this.offers[$event.dst.itemIndex],
      this.offers[$event.src.itemIndex]
      ]
  }
  transferCard($event: {
    src: { itemIndex: number, listIndex: number},
    dst: { listIndex: number }
  }): void {



    let tab = [];
    //
    tab = [...tab, this.offers[$event.src.itemIndex]]
    //this.cards = tab;

    this.lists.offers.push(this.offers[$event.src.itemIndex])
    this.offers.splice($event.src.itemIndex, 1)
    this.lists[($event.dst.listIndex)];
    //console.log('list', this.lists);
    console.log('item', $event.src.itemIndex);
    console.log('item', $event.src.listIndex);
    console.log('listDst', $event.dst.listIndex);

    //console.log("dst", this.offers[$event.dstIndex], 'src',  this.offers[$event.srcIndex] );

  }
  /*switchCard($event: { srcIndex: number, dstIndex: number }): void {
    /*const tmp = this.offers[$event.srcIndex];
    this.offers[$event.srcIndex] = this.offers[$event.dstIndex];
    this.offers[$event.dstIndex] = tmp;
    [
      this.lists[$event.srcIndex],
      this.lists[$event.dstIndex]
    ] = [
        this.lists[$event.dstIndex],
        this.lists[$event.srcIndex]
      ]
  }*/
//console.log('src',  this.offers[$event.srcIndex], 'dst', this.offers[$event.dstIndex]);


}
