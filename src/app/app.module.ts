import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from "primeng/button";
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelComponent } from './hotel/hotel.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { AdduserComponent } from './adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { MenuModule } from 'primeng/menu';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TableModule } from 'primeng/table';
import { PlageComponent } from './plage/plage.component';















@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    NavbarComponent,
    LoginComponent,
    UnauthorizedComponent,
    RegisterComponent,
    AdduserComponent,
    DashboardComponent,
    PlageComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToolbarModule,
    TableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    TagModule,
    ToastModule,
    FileUploadModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    MenuModule,
    InputNumberModule,
    SidebarModule,
    InputTextModule,
    InputSwitchModule,
    TooltipModule,
    MessagesModule,
    CheckboxModule,
    MultiSelectModule,
    PasswordModule,
    ChipModule,
    CardModule,
    AngularEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
