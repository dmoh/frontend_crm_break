import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mySwal') mySwal: SwalComponent;
  title = 'frontend';


  ngAfterViewInit() {
    //this.mySwal.fire();
  }
}
