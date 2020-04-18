import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerComponent } from './manager.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerComponent ],
      imports: [ApolloTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
