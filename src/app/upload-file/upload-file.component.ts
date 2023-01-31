import {Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {environment} from "@environments/environment";
import {AuthenticationService} from "@app/_services/authentication.service";
import {isInt} from "@fullcalendar/angular";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  @Input()
  requiredFileType:string;
  @Output() newImg: EventEmitter<any> = new EventEmitter<any>();
  environment = environment;
  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  @Input() propertyId : number = 0

  constructor(private http: HttpClient,
              private authenticateService: AuthenticationService) {}

  onFileSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("img", file);
      const obj = {
        isForTrackingRecord: true,
        propertyId: this.propertyId
      }
      const currentUser = this.authenticateService.currentUserValue
      const headersTok = new HttpHeaders().append('Authorization',
        `Bearer ${<string>currentUser.token}`);
      formData.append('data', JSON.stringify(obj))

      if (this.propertyId && isInt(this.propertyId)) {
        formData.append('propertyId', `${this.propertyId}`)
      }

      const upload$ = this.http.post(`${this.environment.baseApiUrl}/property/tracking-record/add/media`, formData, {
        reportProgress: true,
        observe: 'body',
        headers: headersTok
      })
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe((event : any) => {
        console.warn('event upload', event)
        if (event.ok
          && event.property
          && event.property.medias
        ) {
          this.newImg.next(event.property)
        }
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
