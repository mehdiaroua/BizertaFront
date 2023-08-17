import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private http: HttpClient, private UserService: UserService, private route:Router) {}
  logout() {
    this.UserService.logout();
    sessionStorage.removeItem('auth-user');
    this.route.navigate(['/login']);
  }

}
