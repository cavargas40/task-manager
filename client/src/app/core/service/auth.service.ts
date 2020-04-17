import { Injectable } from '@angular/core';
import { Login } from 'app/data/schema/auth';
import { Router } from '@angular/router';
import { LoginGQL } from 'app/modules/graphql/mutations/auth.mutation';
import { map } from 'rxjs/operators';
import { GraphQLCustom } from 'app/shared/abstract/graphql-custom';

@Injectable({ providedIn: 'root' })
export class AuthService extends GraphQLCustom {
  constructor(private router: Router, private loginGQL: LoginGQL) {
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

  logout() {
    localStorage.clear();
    this.redirectToLoginPage();
  }

  setSession(login: Login) {
    localStorage.setItem('user', JSON.stringify({ ...login.user }));
    localStorage.setItem('token', JSON.stringify(login.token));

    if (login.token) {
      this.redirectToMainPage();
    } else {
      // this.logout();
    }
  }

  getSession() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    console.log('authenticated');
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
}
