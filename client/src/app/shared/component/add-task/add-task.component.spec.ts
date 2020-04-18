import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ApolloTestingModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
