import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';
import { MessageService } from 'primeng/api';
import { User } from '../models/user';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [MessageService]

})
export class ProfileUserComponent implements OnInit{

  user:any;

  constructor(private storageService:StorageService, private userService:UserService,private messageService:MessageService){}


  ngOnInit(): void {
    this.user= this.storageService.getUser();
    console.log(this.user);
    this.userService.getUserById(this.storageService.getUser().id).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });

  }
  GetUserObjects(){
    this.userService.getUserById(this.storageService.getUser().id).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }
  

}
