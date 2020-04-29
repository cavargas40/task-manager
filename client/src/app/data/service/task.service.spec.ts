import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { TaskGQL } from 'app/modules/graphql/queries/tasks.query';
import {
  CreateTaskGQL,
  UpdateTaskStateGQL,
  DeleteTaskGQL,
} from 'app/modules/graphql/mutations/task.mutation';

describe('TaskService', () => {
  let service: TaskService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(TaskService);

    controller = TestBed.get(ApolloTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks by user', () => {
    service.fetchTasks().subscribe((tasks) => {
      expect(tasks.length).toEqual(2);
      const [task1, task2] = tasks;

      expect(String(task1.id)).toEqual('1');
      expect(task1.description).toBe('Finish Tests');
      expect(task2.completionDate).toBe('04/27/2020 05:40:00');
    });

    const taskGQL = TestBed.inject(TaskGQL);

    const op = controller.expectOne(taskGQL.document);

    op.flush({
      data: {
        tasks: [
          {
            id: 1,
            completionDate: '04/29/2020 11:50:32',
            description: 'Finish Tests',
            state: 'pending',
          },
          {
            id: 2,
            completionDate: '04/27/2020 05:40:00',
            description: 'Kiss your girlfriend',
            state: 'done',
          },
        ],
      },
    });

    controller.verify();
  });

  it('should create a task', () => {
    const description = 'My New Task';
    const completionDate = '04/30/2020 11:45:00';

    service.createTask(description, completionDate).subscribe((res) => {
      const { id, description: descriptionRes, state } = res;
      expect(state).toBe('pending');
      expect(id).toBeDefined();
      expect(description).toBe(descriptionRes);
    });

    const createTaskGQL = TestBed.inject(CreateTaskGQL);
    const op = controller.expectOne(createTaskGQL.document);

    expect(op.operation.variables.description).toEqual(description);

    op.flush({
      data: {
        createTask: {
          id: '20',
          description,
          state: 'pending',
        },
      },
    });
  });

  it('should update the state of a task', () => {
    const taskId = '123';
    const state = 'done';
    service.updateTaskState(taskId, state).subscribe((res) => {
      expect(res.state).toBe(state);
      expect(res.id).toBe(taskId);
    });

    const updateTaskStateGQL = TestBed.inject(UpdateTaskStateGQL);
    const op = controller.expectOne(updateTaskStateGQL.document);

    expect(op.operation.variables.id).toEqual(taskId);

    op.flush({
      data: {
        updateTaskState: {
          id: taskId,
          description: 'Task to do something',
          state: 'done',
        },
      },
    });
  });

  it('should delete a task', () => {
    const taskId = '1234';
    service.deleteTask(taskId).subscribe((res) => {
      expect(res.isDeleted).toBeTruthy();
    });

    const deleteTaskGQL = TestBed.inject(DeleteTaskGQL);

    const op = controller.expectOne(deleteTaskGQL.document);

    expect(op.operation.variables.id).toEqual(taskId);

    op.flush({
      data: {
        deleteTask: {
          isDeleted: true,
        },
      },
    });
  });
});
