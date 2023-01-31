import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/_models/user';
import {AuthenticationService} from '@app/_services/authentication.service';
import {first} from 'rxjs/operators';
import { AutServiceService } from '@app/_services/aut-service.service';
import {MatDialog} from "@angular/material/dialog";
import {PasswordForgotComponent} from "@app/_modals/password-forgot/password-forgot.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  showSpinner = false;

  //loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: boolean;
  user = new User();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private autService: AutServiceService,
              private dialog: MatDialog
  ) {
    // redirect to home if already logged in
    /*f (this.loginForm.value) {
      this.router.navigate(['/']);
    }*/
  }
  /*initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }*/

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    //this.user = this.loginForm.value;
    //this.initForm()

    //this.user = new User();
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onLoggedin() {
    // let isValidUser: Boolean = this.autService.SignIn(this.loginForm.value);

    /*if (isValidUser) {
      this.router.navigate(['/dashboard'])
    } else {
      this.error = true;
    }*/
    this.showSpinner = true;


    let user = new User();
    user = Object.assign(user, this.loginForm.value);
    user.username = user.email;

    this.authenticationService.login({username: user.username, password: user.password})
      .subscribe((response) => {
        if(response.token)  {
          this.router.navigate(['/dashboard/overview']);
        }

        this.showSpinner = false
      }, error => {
        this.error = error.message
      });
  }
  // convenience getter for easy access to form fields
  /*get f() { return this.loginForm.controls; }*/
  /* goToDashboard(): void {
    console.log('user', this.user);
    let isValidUser: Boolean = this.autService.SignIn(this.user);
    if (isValidUser) {
      this.router.navigate(['/dashboard']);
      //this.router.navigate(['/'])
    }alert('erreur')
  }*/


  onSubmit(): void {
   /*this.submitted = true;
    this.loading = true;
    this.goToDashboard();*/

    // stop here if form is invalid
    /*if (this.loginForm.invalid) {

      return;
    }
    this.loading = true;
    //this.authenticationService.login(this.f.email.value, this.f.password.value)
    this.authenticationService.login(this.f.user.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          console.log(this.user, 'user')
        },
        error => {
          this.error = error;
          this.loading = false;
        });*/
  }

  onOpenModal() {
    this.dialog.open(PasswordForgotComponent, {
      autoFocus: false
    })
  }
}
