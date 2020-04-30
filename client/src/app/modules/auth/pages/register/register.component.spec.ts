import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ApolloTestingModule } from 'apollo-angular/testing';
import { of, throwError } from 'rxjs';
import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';

import { RegisterComponent } from './register.component';
import { AuthService } from 'app/core/service/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let AuthServiceStub: Partial<AuthService>;
  const formBuilder: FormBuilder = new FormBuilder();

  AuthServiceStub = {
    isAuthenticated: () => false,
    signUp: () =>
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
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validity', () => {
    component.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    const form = component.registerForm;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    nameInput.setValue('Carlos Vargas');
    emailInput.setValue('cavargas40@gmail.com');
    passwordInput.setValue('123');

    expect(form.valid).toBeTruthy();
  });

  it('should test input errors', () => {
    const emailInput = component.registerForm.controls.email;

    expect(emailInput.errors.required).toBeTruthy();

    emailInput.setValue('cavargas40@gmail.com');

    expect(emailInput.errors).toBeNull();
  });

  it('should register a user', () => {
    component.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    const form = component.registerForm;

    const nameInput = form.controls.name;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    nameInput.setValue('Carlos Vargas');
    emailInput.setValue('cavargas40@gmail.com');
    passwordInput.setValue('123');

    const service = TestBed.inject(AuthService);
    spyOn(service, 'setSession').and.callThrough();

    component.register();

    expect(service.setSession).toHaveBeenCalled();
  });

  it('should fail the register', () => {
    const service = TestBed.inject(AuthService);
    spyOn(service, 'signUp').and.callFake(() => {
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

    component.register();
    expect(component.isLoading).toBeFalsy();
  });
});
