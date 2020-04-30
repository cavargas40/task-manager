import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ApolloTestingModule } from 'apollo-angular/testing';
import { of, throwError } from 'rxjs';

import {
  DragDropEventFactory,
  ContainerModel,
} from 'app/shared/test/drag-drop-event-factory';
import { ManagerComponent } from './manager.component';
import { TaskService } from 'app/data/service/task.service';
import { Task } from 'app/data/schema/task';

describe('ManagerComponent', () => {
  const dragDropEventFactory = new DragDropEventFactory<Task>();
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;
  let TaskServiceStub: Partial<TaskService>;
  TaskServiceStub = {
    fetchTasks: () =>
      of([
        {
          id: '1',
          completionDate: '04/29/2020 11:00:50',
          description: 'Mock Task 1',
          state: 'pending',
        },
        {
          id: '2',
          completionDate: '04/30/2020 11:55:50',
          description: 'Mock Task 2',
          state: 'pending',
        },
        {
          id: '3',
          completionDate: '04/28/2020 15:25:25',
          description: 'Mock Task 3',
          state: 'done',
        },
      ]),
    updateTaskState: (id, state) =>
      of({
        id,
        state,
        completionDate: '04/28/2020 15:25:25',
        description: 'Mock Task 3',
      }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerComponent],
      imports: [
        ApolloTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: TaskService,
          useValue: TaskServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks and group them in pending and done ', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'fetchTasks').and.callThrough();

    component.fetchTasks();

    expect(service.fetchTasks).toHaveBeenCalled();
    expect(component.pending.length).toEqual(2);
    expect(component.done.length).toEqual(1);
  });

  it('should get an error fetching tasks', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'fetchTasks').and.callFake(() =>
      throwError(new Error('An error has ocurred'))
    );

    component.fetchTasks();

    expect(service.fetchTasks).toHaveBeenCalled();
  });

  it('should test drag & drop functionality', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'updateTaskState').and.callThrough();
    component.fetchTasks();
    const data = [
      {
        id: '3',
        completionDate: '04/28/2020 15:25:25',
        description: 'Mock Task 3',
        state: 'done',
      },
    ];

    const dragDropEventSimple = dragDropEventFactory.createInContainerEvent(
      'pendings',
      data,
      1,
      0
    );

    component.drop(dragDropEventSimple, 'pending');

    const from: ContainerModel<Task> = {
      id: 'pendingTasks',
      data: component.pending,
      index: 1,
    };
    const to: ContainerModel<Task> = {
      id: 'selectedAggregations',
      data: component.done,
      index: 2,
    };

    const dragDropEvent = dragDropEventFactory.createCrossContainerEvent(
      from,
      to
    );

    component.drop(dragDropEvent, 'pending');

    expect(service.updateTaskState).toHaveBeenCalled();
  });
});
