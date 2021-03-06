import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { ApolloTestingModule } from 'apollo-angular/testing';
import { Observable } from 'apollo-link';
import { of } from 'rxjs';

import { NavComponent } from './nav.component';
import { AuthService } from 'app/core/service/auth.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let AuthServiceStub: Partial<AuthService>;

  AuthServiceStub = {
    logout: () => of([]).toPromise(),
    isAuthenticated: () => true,
  };

  class MdDialogMock {
    open() {
      return {
        afterClosed: () => Observable.of([]),
      };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        ApolloTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: AuthServiceStub,
        },
        {
          provide: MatDialog,
          useClass: MdDialogMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', async () => {
    spyOn(component, 'logout').and.callThrough();
    await component.logout();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should open the dialog', () => {
    const dialog = TestBed.get(MatDialog);
    spyOn(dialog, 'open').and.callThrough();
    component.addTask();
    expect(dialog.open).toHaveBeenCalled();
  });
});
