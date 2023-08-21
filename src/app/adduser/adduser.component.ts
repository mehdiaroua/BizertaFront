import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERole, User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  signupForm!: FormGroup;
  errorMessage!: string;
  user: User = new User();


  constructor(private formBuilder: FormBuilder, private userService: UserService,private route:Router,private http: HttpClient) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      role: [[{ id: 1, name: ERole.ROLE_ADMIN }], Validators.required]
    });
   }



   onSubmit(): void {
    this.user.username = this.signupForm.value.username;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.role = [this.signupForm.value.role];

    this.http.post<any>('http://localhost:8080/api/auth/add', this.user)
      .subscribe(
        response => {
          console.log('User registered:', response);
          this.route.navigate(['/dash'], { queryParams: { id: response.id } });
          location.reload();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
  }

}
