import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  showActive: boolean;
  showProgressBar: boolean
  constructor() { }

  ngOnInit(): void {
    setTimeout(_=> {
      this.onShowToast()
    },8000)
  }


  onShowToast(){
    let toast = document.querySelector(".toast-notification")
    let closeIcon = document.querySelector(".close-notification")
    let progress = document.querySelector(".progress-notification")

    let timer1, timer2;
    this.showActive = true;
    this.showProgressBar = true;

    progress?.classList.add("active-notification");

    timer1 = setTimeout(() => {
      // toast?.classList.remove("active-notification");
      this.showActive = false
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
      //progress?.classList.remove("active-notification");
      //console.warn('progress', progress);
      this.showProgressBar= false
    }, 5300);


    /*clearTimeout(timer1);
    clearTimeout(timer2);*/

  }

  onRemoveToast() {
    this.showActive = false
  }
}
