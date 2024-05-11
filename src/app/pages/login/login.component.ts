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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: Login;
  errorMessage: string;
  successMessage: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    this.http
      .post('http://localhost:8080/api/user/login', this.loginObj)
      .subscribe(
        (res: any) => {
          if (res) {
            this.successMessage = 'Login successful!';
            localStorage.setItem('userToken', res.token);
            this.router.navigate(['/dashboard'], {
              queryParams: {
                user: JSON.stringify(res.name),
                id: JSON.stringify(res._id),
              },
            });
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

  navigateToSignUp(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
