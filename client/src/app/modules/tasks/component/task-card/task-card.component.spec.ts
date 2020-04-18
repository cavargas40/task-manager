import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { TaskService } from 'app/data/service/task.service';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCardComponent ],
      imports: [ApolloTestingModule, MatSnackBarModule, MatMenuModule],
      providers: [TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
