import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { TaskGrouperPipe } from './pipe/task-grouper.pipe';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [ControlMessagesComponent, TaskGrouperPipe, AddTaskComponent],
  imports: [CommonModule, OwlDateTimeModule, OwlNativeDateTimeModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule],
  exports: [MaterialModule, ControlMessagesComponent, FormsModule, ReactiveFormsModule, RouterModule, TaskGrouperPipe, AddTaskComponent],
})
export class SharedModule {}
