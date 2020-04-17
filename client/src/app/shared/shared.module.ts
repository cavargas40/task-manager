import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';

@NgModule({
  declarations: [ControlMessagesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [MaterialModule, ControlMessagesComponent, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
