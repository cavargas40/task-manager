import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'app/core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'app/shared/component/add-task/add-task.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public dialog: MatDialog) {}

  logout() {
    this.authService.logout();
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      height: 'auto',
      width: 'auto',
    });
  }

}
