import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'app/data/service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  error: string;
  isLoading: boolean = false;
  addTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm(): void {
    this.addTaskForm = this.formBuilder.group({
      description: ['', Validators.required],
      completionDate: ['', Validators.required],
    });
  }

  get f() {
    return this.addTaskForm.controls;
  }

  add() {
    this.isLoading = true;
    const { description, completionDate } = this.addTaskForm.value;

    this.taskService.createTask(description, completionDate).subscribe(
      (res) => {
        this.snack('Task created succesfully');
        this.dialogRef.close();
      },
      (error) => console.log(error)
    );
  }

  snack(message, action = 'Dismiss', duration = 3000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
