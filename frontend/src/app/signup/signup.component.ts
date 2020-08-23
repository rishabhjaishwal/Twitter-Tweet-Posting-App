import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../core/utils/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../core/utils/must-match.validator';
import { LoginService } from '../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private snack: SnackbarService, private login: LoginService, private route: Router ) { }

  ngOnInit(): void {
    const isLogin = localStorage.getItem('currentUser');
    if(isLogin) {
      this.route.navigateByUrl('/dashboard');
    }
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
       }, {
        validator: MustMatch('password', 'confirmpassword')
    });
    this.snack.openSnackBar('Create new account', 2000);
  }

  get f() { return this.signUpForm.controls; }

  onSubmit(value) {
    delete value.confirmpassword;
    this.login.signUp(value).subscribe(res => {
      this.snack.openSnackBar(res.message, 2000);
      this.route.navigateByUrl('/login');
  }, err =>
  this.snack.openSnackBar(err, 2000));
  }
}
