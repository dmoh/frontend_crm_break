import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../models/list';
import { Offer } from '../models/offer';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pipe-drive',
  templateUrl: './pipe-drive.component.html',
  styleUrls: ['./pipe-drive.component.scss'],
  providers: [MatSnackBar]
})
export class PipeDriveComponent implements OnInit {
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
  offres: any[] = [
    {
      titre: 'Prospect identifié',
      offre:
        [
          {
            offerName: 'Immeuble paris',
            name: 'Sacko',
            lastName: "Mohamed",
            amount: 50000
          },

        ],



    },
    {
      titre: 'Contact effectué',
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
      titre: 'Proposition effectué',
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

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  hoverBasket() {
    //this.over = true;
  }

  drop(event: CdkDragDrop<string[]>) {

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
    const dialogRef = this.dialog.open(OfferModalComponent, {
      width: '50%',
      data: new Offer,
    });
    /*dialogRef.afterClosed().subscribe(offer => {

      if (offer) {

        this.offers.push(offer)
        this.snackBar.open('Offre Ajoutée', 'Annulé', { duration: 2000 });
      }

    })*/
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
