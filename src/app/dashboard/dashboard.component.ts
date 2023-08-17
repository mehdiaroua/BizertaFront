import { Component, OnInit } from '@angular/core';
import { ERole, Role, User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DialogService]

})

export class DashboardComponent implements OnInit{
  userss!: User[];


  selectedRole: string = '';
  roles: Role[] = [];
  data: any;
  enabled!: boolean;
items!: any;
items1!: any;
  isEditing = false; // add a new variable to track editing mode
  selectedUser!: User;
  username!: string;
  userForm!: FormGroup;
  user!: User;
  id!: number;
  role: Role[] = [
    { id: 1, name: ERole.ROLE_USER },
    { id: 2, name: ERole.ROLE_ADMIN }
  ];
  users: any[] = [];

  ref!: DynamicDialogRef;





  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private storage:StorageService,public dialogService: DialogService) {
    this.roles = [
      { id: 1, name: ERole.ROLE_USER },
      { id: 3, name: ERole.ROLE_ADMIN },
      
    ];
    



   }
   gotoStat() {
    this.router.navigate(['/pie']);
  }

  ngOnInit(): void {
this.user=this.storage.getUser();
console.log(this.user.id);
    this.userService.getAllUsers().subscribe(data => {

      this.users = data;
      this.users.forEach(user => { user.selectedRole = user.roles[0];
          console.log(user.selectedRole.name)
      });
      console.log(this.users);
    });
  }

  show(){
    this.ref = this.dialogService.open(AdduserComponent, { header: 'Add User'});
  }

  onUpdateRole(userId: number, roleName: string) {

    this.userService.updateUserRole(userId, roleName)
      .subscribe(
        () => {
          // Role update successful
          alert('Role updated successfully.');
          location.reload();
        },
        (error) => {
          // Role update failed
          console.error('Role update failed:', error);
          if (error.status === 200) {
            // Handle plain text response
            alert(error.error);
          } else {
            // Handle JSON response
            alert('Failed to update role. Please try again later.');
          }
        }

      );
  }


  searchUsers() {
    console.log('Searching for users with username: ' + this.username);
    this.userService.searchUsersByUsername(this.username).subscribe(
      data => {
        console.log('Users found: ' + JSON.stringify(data));
        this.users = data;
        location.reload();

      },
      error => console.log(error)
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // User deleted successfully
          // Reload the list of users
          this.userService.getAllUsers().subscribe(data => {
            this.users = data;
            location.reload();

          });
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    }
  }
  






 
  onEdit(id: number): void {
    this.isEditing = true;
    this.selectedUser = this.users.find(user => user.id === id);
  }


  ngOnInit1(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUser(this.id);
    });
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onEdit1(user: User): void {
    this.selectedUser = user;
    this.isEditing = true;

  }


  onUpdate() {
    this.selectedUser.role = [this.selectedUser.selectedRole]; // update the role of the user

    this.userService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe(
        response => {
          console.log(response);
          this.isEditing = false;
          this.selectedUser = new User();
          this.ngOnInit();


        },
        error => {
          console.log(error);
        });

  }


  onCancel(): void {
    this.selectedUser = {} as User;
    this.isEditing = false;
  }


  getUser(id: number): void {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user = data;
          this.userForm.patchValue({
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          });
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(): void {
    this.user = this.userForm.value;
    this.userService.updateUser(this.id, this.user)
      .subscribe(
        response => {
          console.log(response);
          this.isEditing = false;
          this.router.navigate(['/dash']);
        },
        error => {
          console.log(error);
        });
  }

}
