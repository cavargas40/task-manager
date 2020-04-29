import { Component } from '@angular/core';
import { AuthService } from 'app/core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'app/shared/component/add-task/add-task.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private authService: AuthService, public dialog: MatDialog) {}

  logout() {
    this.authService.logout();
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  addTask() {
    this.dialog.open(AddTaskComponent, {
      height: 'auto',
      width: 'auto',
    });
  }
}
