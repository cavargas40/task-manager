import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, ApolloTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
