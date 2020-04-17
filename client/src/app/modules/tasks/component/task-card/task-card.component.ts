import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'app/data/schema/task';
import { TaskService } from 'app/data/service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changeState() {
    const nextstate = this.task.state === 'pending' ? 'done' : 'pending';
    this.taskService
      .updateTaskState(this.task.id, nextstate)
      .subscribe((res) => this.snack(`Task state updated to ${nextstate}`));
  }

  deleteTask() {
    this.taskService
      .deleteTask(this.task.id)
      .subscribe((res) => this.snack(`Task deleted succesfully`));
  }

  snack(message, action = 'Dismiss', duration = 3000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
