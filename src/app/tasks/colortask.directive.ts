import { Directive, ElementRef, HostBinding, Input, OnInit } from "@angular/core";

@Directive({
  selector: '[appColor]'
})
export class ColortaskDirective implements OnInit{
  low = 'green';
  hight = 'red';
  normal = 'blue';
  //colori: string;
  @HostBinding('style.color') private color;
  @Input('color') public colori: string;
  //this.el.nativeElement.style.color = 'green';

  constructor(public el: ElementRef<any>) {
    /*this.el.nativeElement.style.color = this.colori;
    //this.el.nativeElement.style.color = 'green';
    console.log(this.el, 'el')
    if (this.el.nativeElement.innerText = 'hight') {
      this.colori = "red";
    } else if (this.el.nativeElement.innerText = 'low') {
      this.colori = "green";
    }*/
  }
  ngOnInit():void {
    this.color = this.colori;
  }
}
