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
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { VoyageComponent } from './voyage/voyage.component';
import { VoyageDetailComponent } from './voyage-detail/voyage-detail.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { PlageDetailComponent } from './plage-detail/plage-detail.component';
import { HotelBackComponent } from './hotel-back/hotel-back.component';
import { AddhotelComponent } from './addhotel/addhotel.component';
import { AddplageComponent } from './addplage/addplage.component';
import { PlageBackComponent } from './plage-back/plage-back.component';
import { VoyageBackComponent } from './voyage-back/voyage-back.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';


const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: "unauthorized", component:UnauthorizedComponent},
{path:"hotels", component:HotelComponent},
{path: "login", component:LoginComponent},
{path: "register", component:RegisterComponent},
{path: "add", component:AdduserComponent},
{path: "dash", component:DashboardComponent,canActivate: [RoleGuard],
data: { requiredRoles: [ERole.ROLE_ADMIN] }},
{path: "plage", component:PlageComponent},
{path: "About", component:AboutComponent},
{path: "home", component:HomeComponent},
{path: "voyage", component:VoyageComponent},
{path: "mdetail/:id", component:VoyageDetailComponent},
{path: "mhotel/:id", component:HotelDetailComponent},
{path: "mplage/:id", component:PlageDetailComponent},
{path: "hotelb", component:HotelBackComponent,canActivate: [RoleGuard],
data: { requiredRoles: [ERole.ROLE_ADMIN] }},
{path: "addh", component:AddhotelComponent},
{path: "addp", component:AddplageComponent},
{path: "addm", component:AddplageComponent},

{path: "maisonb", component:VoyageBackComponent,canActivate: [RoleGuard],
data: { requiredRoles: [ERole.ROLE_ADMIN] }},
{path: "profile", component:ProfileUserComponent},




















];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
