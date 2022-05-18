import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardreportComponent } from './reports/dashboardreport/dashboardreport.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CourseindraftreportComponent } from './reports/courseindraftreport/courseindraftreport.component';
import { CoursepublishedComponent } from './reports/coursepublished/coursepublished.component';
import { LoginreportComponent } from './reports/loginreport/loginreport.component';
import { MdoreportComponent } from './reports/mdoreport/mdoreport.component';
import { OrgreportComponent } from './reports/orgreport/orgreport.component';
import { UserinvoleincourseComponent } from './reports/userinvoleincourse/userinvoleincourse.component';
import { LogoutComponent } from './logout/logout.component';
import { LearnerreportsComponent } from './reports/learnerreports/learnerreports.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } 
    from "@angular/platform-browser/animations";
@NgModule({
  declarations: [
    AppComponent,
    DashboardreportComponent,
    LoginComponent,
    HeaderComponent,
    CourseindraftreportComponent,
    CoursepublishedComponent,
    LoginreportComponent,
    MdoreportComponent,
    OrgreportComponent,
    UserinvoleincourseComponent,
    LogoutComponent,
    LearnerreportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    AvatarModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
