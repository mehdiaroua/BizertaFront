import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ERole, User } from '../models/user';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  data : Date = new Date();

  currentUser!: User;
  reponsedata: any;

  constructor(private http:HttpClient,private route:Router) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  signup(signupData:any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/auth/signup`, signupData, httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signout', { }, httpOptions);
  }
  isLoggedIn(){
    return sessionStorage.getItem('auth-user')!=null;
  }

  GetToken(){
    return sessionStorage.getItem('auth-user')||'';


  }

  haveAccess(requiredRoles: ERole[]): boolean {
    const user = JSON.parse(sessionStorage.getItem('auth-user') || '');
    if (user && user.accessToken) {
      const roles = user.roles;
      for (const requiredRole of requiredRoles) {
        if (roles.includes(requiredRole)) {
          return true;
        }
      }
    }
    return false;
  }
  searchUsersByUsername(username: string): Observable<User[]> {
    const url = `http://localhost:8080/api/auth/users/search?username=${username}`;
    return this.http.get<User[]>(url);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/auth/getUserById/${id}`);
  }
  
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`http://localhost:8080/api/auth//update/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/auth/deleteUser/${id}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/auth/getAllUser');
  }
  addUser(signUpRequest: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/auth/add`, signUpRequest);
  }
  updateUserRole(userId: number, roleName: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/auth/${userId}/role/${roleName}`, null);
  }
}
