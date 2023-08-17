import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login/login.component';
import { RoleGuard } from './User/role.guard';
import { ERole } from './models/user';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { AdduserComponent } from './adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlageComponent } from './plage/plage.component';


const routes: Routes = [
{ path: '', redirectTo: 'hotels', pathMatch: 'full' },
{ path: "unauthorized", component:UnauthorizedComponent},
{path:"hotels", component:HotelComponent},
{path: "login", component:LoginComponent},
{path: "register", component:RegisterComponent},
{path: "add", component:AdduserComponent},
{path: "dash", component:DashboardComponent,canActivate: [RoleGuard],
data: { requiredRoles: [ERole.ROLE_ADMIN] }},
{path: "plage", component:PlageComponent},











];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
