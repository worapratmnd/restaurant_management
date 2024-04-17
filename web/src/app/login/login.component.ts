import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormSubmitted = false;
  loginFailed;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  get lf() {
    return this.loginForm.controls;
  }

  async ngOnInit(): Promise<void> {
    this.loginFailed = null;
    let cookkieAuth: any = localStorage.getItem("login-auth");
    if (cookkieAuth) {
      cookkieAuth = JSON.parse(cookkieAuth);
      try {
        await this.authService.signinUser(
          cookkieAuth.username,
          cookkieAuth.password,
        );
      } catch (e) {
        this.loginFailed = e.error;
        this.cdr.detectChanges();
      }
    }
  }

  async onSubmit() {
    console.log("onSubmit");
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this.authService.signinUser(
        this.loginForm.value.username,
        this.loginForm.value.password,
      );
    } catch (e) {
      console.log(e);
      this.loginFailed = e.error;
      this.cdr.detectChanges();
    } finally {
    }
  }

}
