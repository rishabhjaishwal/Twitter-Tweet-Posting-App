import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../core/utils/snackbar.service';
import { LoginService } from '../core/services/login.service';
import {loginData} from '../core/interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private snack: SnackbarService, 
    private loginService: LoginService, 
    private route: Router) { }

  ngOnInit(): void {
    const isLogin = localStorage.getItem('currentUser');
    if (isLogin) {
      this.route.navigateByUrl('/dashboard');
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.required],
       });
    this.snack.openSnackBar('Login to dashboard', 2000);

  }

  get f() { return this.loginForm.controls; }

  onSubmit(value: loginData) {
    this.loginService.login(value).subscribe(res => {
        const data = res.data;
        if (data.token) {
          localStorage.setItem('currentUser', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.route.navigateByUrl('/dashboard');
          this.snack.openSnackBar(res.message, 2000);
        }
    }, err => 
    this.snack.openSnackBar(err, 2000)
    )
  }
}
