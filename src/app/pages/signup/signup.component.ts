import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { errorFormatter } from '../../../utils/utils';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpObj: SignUp;
  errorMessage: string;
  successMessage: string;

  constructor(private http: HttpClient, private router: Router) {
    this.signUpObj = new SignUp();
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSignUp() {
    this.errorMessage = '';
    this.successMessage = '';

    this.http
      .post('http://localhost:8080/api/user/create', this.signUpObj)
      .subscribe(
        (res: any) => {
          if (res) {
            this.successMessage = 'Login successful!';
            localStorage.setItem('userToken', res.token);
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `An error occurred: ${errorFormatter(
              error.error.message
            )}`;
          } else {
            this.errorMessage = `${errorFormatter(error.error.message)}`;
          }
        }
      );
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}

export class SignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
