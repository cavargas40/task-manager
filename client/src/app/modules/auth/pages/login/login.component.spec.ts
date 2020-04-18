import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, ApolloTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
