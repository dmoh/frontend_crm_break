import { Directive, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  //@HostBinding('style.color') private color;
  //@Input('color') public colori: string = 'red';

  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @HostBinding('class.cdk-drop-list-dragging') public is = 'red';

  @HostListener('dragenter') public dragEnter() {
    this.isIn = true;
    console.log('enter', this.isIn);

  }
  @HostListener('dragleave') public dragLeave() {
    this.isIn = false;
    console.log('leave', this.isIn);

  }
  /*@HostListener('dragover', ['$event']) public dragOver($event) {
    $event.preventDefault();
  }*/

 /* @Input('itemIndex') public itemIndex;
  @Input('listIndex') public listIndex;
  //@Output() public switch: EventEmitter<{ srcIndex: number, dstIndex: number }> = new EventEmitter()
  //@Output() public transfer: EventEmitter<{ srcIndex: number, dstIndex: number }> = new EventEmitter()
  @Output() public switch: EventEmitter<{
    src: { itemIndex: number, listIndex: number},
    dst: { itemIndex: number, listIndex:number}
  }> = new EventEmitter();
  @Output() public transfer: EventEmitter<{
    src: {itemIndex: number, listIndex:number},
    dst: { listIndex: number}
   }> = new EventEmitter()

  @HostListener('dragstart', ['$event']) public dragStart($event) {
    //console.log("indexStart",{ index: this.itemIndex });
    $event.dataTransfer.setData('itemIndex', this.itemIndex);
    $event.dataTransfer.setData('listIndex', this.listIndex);

  }

  /*@Output() public transfer: EventEmitter<{
    src: { cardIndex: number },
    dst: { cardIndex: number }
   }> = new EventEmitter()


  @HostListener('drop', ['$event']) public drop($event) {
    //console.log('indexDrop', { index: this.listIndex });
    if (this.itemIndex) {
      this.switch.emit({
        src: {
          itemIndex: $event.dataTransfer.getData('itemIndex'),
          listIndex: $event.dataTransfer.getData('listIndex')
        },
        dst: {
          itemIndex: this.itemIndex,
          listIndex: this.listIndex
        }
      });
    } else {
    console.log('indexDrop', { index: this.listIndex });
    console.log('indexstart', { index: this.itemIndex });

      this.transfer.emit({
        src: {
          itemIndex: $event.dataTransfer.getData('itemIndex'),
          listIndex: $event.dataTransfer.getData('itemIndex'),
        },
        dst: { listIndex: this.listIndex }
      });
    }
 }*/



 /* @HostListener('drop', ['$event']) public drop($event) {
    //console.log({ $event });
    this.isIn = false;
    if (this.cardIndex) {
      this.switch.emit({
        src: {cardIndex : $event.dataTransfer.getData('cardIndex')},
        dst: {cardIndex: this.cardIndex}
      });
    } else {
      this.transfer.emit({
        src: {cardIndex : $event.dataTransfer.getData('cardIndex')},
        dst: {cardIndex: this.cardIndex}
      });
    }

  }*/
  constructor(public el: ElementRef<any>) { }
  /*ngOnInit():void {
    this.color = this.colori;
  }*/
}
