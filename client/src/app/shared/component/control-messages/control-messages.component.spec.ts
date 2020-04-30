import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessagesComponent } from './control-messages.component';
import { FormControl, Validators } from '@angular/forms';

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an error message', () => {
    const nameControl = new FormControl('', Validators.required);
    nameControl.markAsTouched();
    component.control = nameControl;

    fixture.detectChanges();

    expect(Object.keys(component.control.errors).length).toBe(1);

    const emailControl = new FormControl('', Validators.required);
    emailControl.markAsTouched();
    emailControl.markAsUntouched();

    component.control = emailControl;

    fixture.detectChanges();

    expect(Object.keys(component.control.errors).length).toBe(1);
  });
});
