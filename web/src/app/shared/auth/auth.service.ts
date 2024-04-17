import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string;
  expireDate: Date;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  getToken() {
    let token = sessionStorage.getItem("AUTH_TOKEN") ?? "";
    console.log("Token: ", token);
    return token;
  }

  removeToken() {
    sessionStorage.removeItem("hopeful_main_token");
    sessionStorage.removeItem("hopeful_main_refresh_token");
  }

  async signinUser(username: string, password: string) {
    const authData: any = { username: username, password: password };
    let res: any = await this.http
      .post(environment.authUrl + "/login", authData)
      .toPromise();

    if (res.data) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(res.data);
      this.user = decodedToken.username;
      sessionStorage.setItem("USERLOGIN", this.user);
      sessionStorage.setItem("AUTH_TOKEN", res.data);
      localStorage.setItem("login-auth", JSON.stringify(authData));

      const expirationDate = helper.getTokenExpirationDate(res.data);
      this.expireDate = expirationDate;
    }

    this.router.navigate(["/"]);
  }

  logout() {
    localStorage.removeItem("login-auth");
    sessionStorage.removeItem("AUTH_TOKEN");
    sessionStorage.removeItem("USERLOGIN");
    this.router.navigate(["/login"]);
  }

  isAuthenticated() {
    try {
      const helper = new JwtHelperService();
      const loginAuth = sessionStorage.getItem("AUTH_TOKEN");
      const isExpired = helper.isTokenExpired(loginAuth);
      return !isExpired;
    } catch (e) {
      return false;
    }
  }

  getUser() {
    let user = JSON.parse(sessionStorage.getItem("USERLOGIN"));
    if (!user) {
      sessionStorage.removeItem("NAV");
      this.router.navigate(["/pages/login"]);
    } else {
      return user;
    }
  }

}
