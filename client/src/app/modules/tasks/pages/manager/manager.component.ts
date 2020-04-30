import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TaskService } from 'app/data/service/task.service';
import { Task } from 'app/data/schema/task';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  pending: Array<Task> = [];
  done: Array<Task> = [];

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.fetchTasks().subscribe(
      (tasks) => {
        this.done = tasks.filter((task) => task.state === 'done');
        this.pending = tasks.filter((task) => task.state === 'pending');
      },
      (error) => console.log(error)
    );
  }

  drop(event: CdkDragDrop<Array<Task>>, currentState: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskState(event.item.data.id, currentState);
    }
  }

  updateTaskState(id: string, state: string) {
    this.taskService.updateTaskState(id, state).subscribe(() => {
      this.snack(`Task state updated to ${state}`);
    });
  }

  snack(message, action = 'Dismiss', duration = 3000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
