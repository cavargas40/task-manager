import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ManagerComponent } from './pages/manager/manager.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
})
export class TasksModule {}
