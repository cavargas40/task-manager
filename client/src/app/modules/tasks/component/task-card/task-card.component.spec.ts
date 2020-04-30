import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';

import { TaskService } from 'app/data/service/task.service';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let TaskServiceStub: Partial<TaskService>;

  TaskServiceStub = {
    deleteTask: () => of({ isDeleted: true }),
    updateTaskState: (id, state) =>
      of({
        id,
        completionDate: '04/29/2020 22:00:00',
        description: 'Finish this tests',
        state,
      }),
  };

  class MatSnackBarMock {
    open() {
      return {};
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [ApolloTestingModule, MatSnackBarModule, MatMenuModule],
      providers: [
        {
          provide: TaskService,
          useValue: TaskServiceStub,
        },
        {
          provide: MatSnackBar,
          useClass: MatSnackBarMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    const inputTask = {
      id: '1',
      completionDate: '04/29/2020 22:00:00',
      description: 'Finish this tests',
      state: 'pending',
    };
    component.task = inputTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the state of the task', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'updateTaskState').and.callThrough();

    component.changeState();

    expect(service.updateTaskState).toHaveBeenCalled();
    expect(service.updateTaskState).toHaveBeenCalledWith('1', 'done');

    component.task.state = 'done';

    component.changeState();

    expect(service.updateTaskState).toHaveBeenCalled();
    expect(service.updateTaskState).toHaveBeenCalledWith('1', 'pending');
  });

  it('should delete a task', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'deleteTask').and.callThrough();

    component.deleteTask();

    expect(service.deleteTask).toHaveBeenCalled();
    expect(service.deleteTask).toHaveBeenCalledWith('1');
  });
});
