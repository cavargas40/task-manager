import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApolloTestingModule } from 'apollo-angular/testing';
import { of, throwError } from 'rxjs';
import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';

import { AuthService } from 'app/core/service/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let AuthServiceStub: Partial<AuthService>;
  const formBuilder: FormBuilder = new FormBuilder();

  AuthServiceStub = {
    isAuthenticated: () => false,
    login: () =>
      of({
        user: {
          id: '1',
          name: 'Carlos',
          email: 'cavargas40@gmail.com',
          password: undefined,
        },
        token: '83473475348sdfjhdgh',
      }),
    redirectToMainPage: () => {},
    setSession: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ApolloTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: AuthServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if the user is authenticated', () => {
    AuthServiceStub.isAuthenticated = () => true;

    const service = TestBed.inject(AuthService);

    spyOn(service, 'redirectToMainPage').and.callThrough();

    component.ngOnInit();

    expect(service.redirectToMainPage).toHaveBeenCalled();
  });

  it('should test form validity', () => {
    component.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    const form = component.loginForm;
    expect(form.valid).toBeFalsy();

    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    emailInput.setValue('cavargas40@gmail.com');
    passwordInput.setValue('123');

    expect(form.valid).toBeTruthy();
  });

  it('should test input errors', () => {
    const emailInput = component.loginForm.controls.email;

    expect(emailInput.errors.required).toBeTruthy();

    emailInput.setValue('cavargas40@gmail.com');

    expect(emailInput.errors).toBeNull();
  });

  it('should login a user', () => {
    component.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    const form = component.loginForm;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    emailInput.setValue('cavargas40@gmail.com');
    passwordInput.setValue('123');

    const service = TestBed.inject(AuthService);
    spyOn(service, 'setSession').and.callThrough();

    component.login();

    expect(service.setSession).toHaveBeenCalled();
  });

  it('should fail the login', () => {
    const service = TestBed.inject(AuthService);
    spyOn(service, 'login').and.callFake(() => {
      return throwError(
        new ApolloError({
          graphQLErrors: [
            new GraphQLError('GraphQL error: access not allowed'),
          ],
          networkError: null,
          errorMessage: 'GraphQL error: access not allowed',
        })
      );
    });

    component.login();
    expect(component.isLoading).toBeFalsy();
  });
});
