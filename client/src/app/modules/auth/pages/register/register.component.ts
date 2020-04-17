import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string;
  isLoading: boolean;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  get f() {
    return this.registerForm.controls;
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    this.isLoading = true;
    const { name, email, password } = this.registerForm.value;

    this.authService.signUp(name, email, password).subscribe(
      (signup) => this.authService.setSession(signup),
      (error) => {
        this.isLoading = false;
        const [errorDetailed] = error.graphQLErrors;
        this.error = errorDetailed.message;
      }
    );
  }
}
