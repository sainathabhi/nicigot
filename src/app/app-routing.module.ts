import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CourseindraftreportComponent } from './reports/courseindraftreport/courseindraftreport.component';
import { CoursepublishedComponent } from './reports/coursepublished/coursepublished.component';
import { DashboardreportComponent } from './reports/dashboardreport/dashboardreport.component';
import { LearnerreportsComponent } from './reports/learnerreports/learnerreports.component';
import { LoginreportComponent } from './reports/loginreport/loginreport.component';
import { MdoreportComponent } from './reports/mdoreport/mdoreport.component';
import { OrgreportComponent } from './reports/orgreport/orgreport.component';
import { UserinvoleincourseComponent } from './reports/userinvoleincourse/userinvoleincourse.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent,
  // canActivate: [PublicauthGuard]
},
{
  path: 'dashboard',
  component: DashboardreportComponent,
   canActivate:[AuthenticationGuard]
},
{
  path: 'orgReport',
  component: OrgreportComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'mdoReport',
  component: MdoreportComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'loginReport',
  component: LoginreportComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'CourseInDraftReport',
  component: CourseindraftreportComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'CoursePublished',
  component: CoursepublishedComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'UserInvolvedCourse',
  component: UserinvoleincourseComponent,
  // canActivate: [PublicauthGuard]
  
},
{
  path: 'LearnerReport',
  component: LearnerreportsComponent,
  // canActivate: [PublicauthGuard]
},
{
  path: 'logout',
  component: LogoutComponent,
  // canActivate: [PublicauthGuard]
},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
