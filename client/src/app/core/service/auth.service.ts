import { Injectable } from '@angular/core';
import { LoginSignUp } from 'app/data/schema/auth';
import { Router } from '@angular/router';
import {
  LoginGQL,
  SignUpGQL,
} from 'app/modules/graphql/mutations/auth.mutation';
import { map } from 'rxjs/operators';
import { GraphQLCustom } from 'app/shared/abstract/graphql-custom';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends GraphQLCustom {

  private tokenExpirationTimer: any;

  constructor(
    private router: Router,
    private loginGQL: LoginGQL,
    private signUpGQL: SignUpGQL,
    private apollo: Apollo
  ) {
    super();
  }

  login(email: string, password: string) {
    return this.loginGQL
      .mutate({
        email,
        password,
      })
      .pipe(map((res) => res.data.login));
  }

  async logout() {
    await this.apollo.getClient().resetStore();
    this.clearLogoutTimer();
    this.redirectToLoginPage();
    localStorage.clear();
  }

  signUp(name: string, email: string, password: string) {
    return this.signUpGQL
      .mutate({
        name,
        email,
        password,
      })
      .pipe(map((res) => res.data.signup));
  }

  setSession(login: LoginSignUp) {
    localStorage.setItem('user', JSON.stringify({ ...login.user }));
    localStorage.setItem('token', JSON.stringify(login.token).replace('"', ''));

    if (login.token) {
      this.redirectToMainPage();
    }
  }

  getSession() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !['null', 'undefined', null, undefined].includes(
      localStorage.getItem('token')
    );
  }

  redirectToMainPage() {
    this.router.navigate(['/tasks']);
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  acquireToken(){
    return new Observable<string>(subscriber => {
      setTimeout(() => {
        if(this.isAuthenticated()) {
          subscriber.next(localStorage.getItem('token'))
        }
        localStorage.getItem('token')
      }, 1000);
    })
  }

}
