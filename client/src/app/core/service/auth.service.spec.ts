import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { AuthService } from './auth.service';
import {
  LoginGQL,
  SignUpGQL,
} from 'app/modules/graphql/mutations/auth.mutation';


describe('AuthService', () => {
  let service: AuthService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule],
    });
    service = TestBed.inject(AuthService);

    controller = TestBed.get(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    const user = 'cavargas40@gmail.com';
    const password = '123';

    const loginGQL = TestBed.inject(LoginGQL);

    service.login(user, password).subscribe((res) => {
      expect(res.token).toBe('akdghdjkhkjhkjhjkhbgf89457458654378');
      expect(String(res.user.id)).toBe('1');
    });

    const op = controller.expectOne(loginGQL.document);

    expect(op.operation.variables.email).toEqual(user);

    op.flush({
      data: {
        login: {
          user: {
            id: 1,
            email: user,
            name: 'Carlos Vargas',
          },
          token: 'akdghdjkhkjhkjhjkhbgf89457458654378',
        },
      },
    });
  });

  it('should logout a user', async () => {
    await service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should signup a new user', () => {
    const name = 'Andres';
    const email = 'andres@gmail.com';
    const password = '1234';

    const signUpGQL = TestBed.inject(SignUpGQL);

    service.signUp(name, email, password).subscribe((res) => {
      expect(res.token).toBe('sakudhasuid45645874e3=');
      expect(String(res.user.id)).toBe('4');
    });

    const op = controller.expectOne(signUpGQL.document);

    expect(op.operation.variables.email).toEqual(email);

    op.flush({
      data: {
        signup: {
          user: {
            id: 4,
            email,
            name,
          },
          token: 'sakudhasuid45645874e3=',
        },
      },
    });
  });

  it('should set & get the session of the user', () => {
    const mockLoginSignUp = {
      user: {
        id: '3',
        name: 'Camilo',
        email: 'camilo@gmail.com',
        password: '',
      },
      token: '132456789',
    };

    service.setSession(mockLoginSignUp);

    const { id, name, email } = service.getSession();

    expect(id).toBe('3');
    expect(name).toBe('Camilo');
    expect(email).toBe('camilo@gmail.com');
  });

  it('should not redirect to main page if there is no token', () => {
    const mockLoginSignUp = {
      user: {
        id: '3',
        name: 'Camilo',
        email: 'camilo@gmail.com',
        password: '',
      },
      token: undefined,
    };

    service.setSession(mockLoginSignUp);

    expect(localStorage.getItem('token')).toBe('');
  });

  it('should check if a user is authenticated', () => {
    localStorage.setItem('token', '123');

    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should set and clear logout timer', async () => {
    await service.setLogoutTimer(500000);
    expect(service['tokenExpirationTimer']).toBeDefined();

    await service.clearLogoutTimer();
    expect(service['tokenExpirationTimer']).toBeNull();
  });

  it('should check the logout timer is working properly', () => {
    spyOn(service, 'logout');

    jasmine.clock().install();
    service.setLogoutTimer(5000);
    jasmine.clock().tick(5500);
    expect(service.logout).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });
});
