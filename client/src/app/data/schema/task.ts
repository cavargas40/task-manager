export interface Task {
  id: string;
  completionDate: string;
  description: string;
  state: string;
}

export interface TaskFetchResponse {
  tasks: Array<Task>;
}

export interface deletedTask {
  isDeleted: boolean;
}

export interface crudTaskResponse {
  createTask: Task;
  updateTaskState: Task;
  deleteTask: deletedTask;
}
