import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'app/data/service/task.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let TaskServiceStub: Partial<TaskService>;
  TaskServiceStub = {
    createTask: (description, completionDate) =>
      of({
        description,
        completionDate,
        state: 'pending',
        id: '5',
      }),
  };

  const formBuilder: FormBuilder = new FormBuilder();

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
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: { close: () => {} } },
        [
          {
            provide: TaskService,
            useValue: TaskServiceStub,
          },
        ],
      ],
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

  it('should test form validity', () => {
    component.addTaskForm = formBuilder.group({
      description: ['', Validators.required],
      completionDate: ['', Validators.required],
    });

    const form = component.addTaskForm;
    expect(form.valid).toBeFalsy();

    const descriptionInput = form.controls.description;
    const completionDateInput = form.controls.completionDate;

    descriptionInput.setValue('My New Task');
    completionDateInput.setValue('04/30/2020 20:00:00');

    expect(form.valid).toBeTruthy();
  });

  it('should test input errors', () => {
    const descriptionInput = component.addTaskForm.controls.description;

    expect(descriptionInput.errors.required).toBeTruthy();

    descriptionInput.setValue('A New Task');

    expect(descriptionInput.errors).toBeNull();
  });

  it('should add a new task', () => {
    component.addTaskForm = formBuilder.group({
      description: ['', Validators.required],
      completionDate: ['', Validators.required],
    });

    const form = component.addTaskForm;

    const descriptionInput = form.controls.description;
    const completionDateInput = form.controls.completionDate;

    descriptionInput.setValue('My New Task');
    completionDateInput.setValue('04/30/2020 20:00:00');

    const service = TestBed.inject(TaskService);
    spyOn(service, 'createTask').and.callThrough();

    component.add();

    const { description, completionDate } = component.addTaskForm.value;

    expect(service.createTask).toHaveBeenCalled();
    expect(service.createTask).toHaveBeenCalledWith(
      description,
      completionDate
    );
  });
});
