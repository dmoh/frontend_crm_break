import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';

@Component({
  selector: 'app-pipe-drive',
  templateUrl: './pipe-drive.component.html',
  styleUrls: ['./pipe-drive.component.scss']
})
export class PipeDriveComponent implements OnInit {
  listLabel = "";
  itemContent: string;
  lists: List[] = [{
    label: 'Prospect Identifié',
    totalAmount: 3000,
    totalOffer: 2,
    items: [
      { content: "Villa" },
      { content: "Jean Edouard" },
      {content: "2000"},

      /*{
        offer: "Villa",
        name: "Jean",
        lastName: "Edouard",
        amount: 2000,
        content: ""
      }*/
    ]

  }];

  constructor() { }

  ngOnInit(): void {
  }
  addList(): void {
    if (this.listLabel) {
      this.lists.push({
        label: this.listLabel,
        totalAmount:0,
          totalOffer:0,
        items: []
      });
      this.listLabel = "";
    }
  }
  addItem(list:List): void {
    if (this.itemContent) {
      list.items.push({
        /*offer: "Villa",
        name: "Jean",
        lastName: "Edouard",
        amount: 2000,*/
        content: this.itemContent,
      });
      this.itemContent = "";
    }
  }
}
