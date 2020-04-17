import { Injectable } from '@angular/core';
import { TaskGQL } from 'app/modules/graphql/queries/tasks.query';
import {
  CreateTaskGQL,
  UpdateTaskStateGQL,
  DeleteTaskGQL,
} from 'app/modules/graphql/mutations/task.mutation';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private taskGQL: TaskGQL,
    private createTaskGQL: CreateTaskGQL,
    private updateTaskStateGQL: UpdateTaskStateGQL,
    private deleteTaskGQL: DeleteTaskGQL
  ) {}

  fetchTasks() {
    return this.taskGQL.watch().valueChanges.pipe(map((res) => res.data.tasks));
  }

  createTask(description: string, completionDate: string) {
    return this.createTaskGQL.mutate(
      {
        description,
        completionDate,
        state: 'pending',
      },
      {
        refetchQueries: [{ query: this.taskGQL.document }],
      }
    );
  }

  updateTaskState(id: string, state: string) {
    return this.updateTaskStateGQL
      .mutate(
        {
          id,
          state,
        },
        {
          refetchQueries: [{ query: this.taskGQL.document }],
        }
      )
      .pipe(map((res) => res.data.updateTaskState));
  }

  deleteTask(id: string) {
    return this.deleteTaskGQL.mutate(
      {
        id,
      },
      {
        refetchQueries: [{ query: this.taskGQL.document }],
      }
    );
  }
}
