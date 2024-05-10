import { Component } from '@angular/core';
import { greetUser } from '../../../utils/utils';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RouteParams {
  user?: any;
  id?: any;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  greeting: string;
  userData: any;
  userId: any;
  updateObj: Update;
  emailMessage: string;
  errorMessage: string;
  successMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.greeting = greetUser();
    this.updateObj = new Update();
    this.emailMessage = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: RouteParams) => {
      if (params.user) {
        this.userData = JSON.parse(params.user);
        this.userId = JSON.parse(params.id);
      }
    });
  }

  onUpdate(id: string) {
    this.http
      .patch(`http://localhost:8080/api/auth/user/update/${id}`, this.updateObj)
      .subscribe(
        (res: any) => {
          if (res) {
            this.successMessage = 'Updated user';
            this.router.navigate(['/dashboard']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `An error occurred: ${error.error.message.replace(
              /[^a-zA-Z0-9 ]/g,
              ''
            )}`;
          } else {
            this.errorMessage = `${error.error.message.replace(
              /[^a-zA-Z0-9 ]/g,
              ''
            )}`;
          }
        }
      );
  }

  onGetData() {
    this.http.get(`http://localhost:8080/api/auth/user/data`).subscribe(
      (res: any) => {
        if (res) {
          this.emailMessage = res.email;
          this.router.navigate(['/dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `An error occurred: ${error.error.message.replace(
            /[^a-zA-Z0-9 ]/g,
            ''
          )}`;
        } else {
          this.errorMessage = `${error.error.message.replace(
            /[^a-zA-Z0-9 ]/g,
            ''
          )}`;
        }
      }
    );
  }

  onDelete() {
    if (confirm('Are you sure you want to delete?')) {
      this.http.delete(`http://localhost:8080/api/auth/user/delete`).subscribe(
        (res: any) => {
          if (res) {
            this.successMessage = 'User deleted successfully';
            this.router.navigate(['/signup']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `An error occurred: ${error.error.message.replace(
              /[^a-zA-Z0-9 ]/g,
              ''
            )}`;
          } else {
            this.errorMessage = `${error.error.message}`;
          }
        }
      );
    }
  }

  onLogout(event: Event): void {
    event.preventDefault();
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}

export class Update {
  name: string;
  email: string;

  constructor() {
    this.name = '';
    this.email = '';
  }
}
