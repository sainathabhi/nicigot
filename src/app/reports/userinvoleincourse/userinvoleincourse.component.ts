import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';

@Component({
  selector: 'app-userinvoleincourse',
  templateUrl: './userinvoleincourse.component.html',
  styleUrls: ['./userinvoleincourse.component.scss']
})
export class UserinvoleincourseComponent implements OnInit {
  userInvolbeInCourseData: any = new Array()
  alluserInvolbeInCourseDataJson: any = new Array()
  colsUsers: any;
  constructor(private httpsss:DashboardreportService) { }
  
  ngOnInit(): void {
    this.userInvolbedInCoursereport();
    this.initializeColumns();
  }
  userInvolbedInCoursereport()
  {
    this.userInvolbeInCourseData=[];
    this.alluserInvolbeInCourseDataJson=[];
    this.httpsss.userInvolveInCourse().subscribe(
      (res: any) => {
this.userInvolbeInCourseData=res;
        this.userInvolbeInCourseData.forEach((y:any) =>
        {  
        console.log(y);
        var finalObj = Object.assign(
          {"User_id":y['User_id']},{"Course_id": y['Course_id']}); 
          this.alluserInvolbeInCourseDataJson.push(finalObj);
        });
        
  
      });
  }
  initializeColumns() {
    this.colsUsers = [ 
      { field: 'User_id', header: 'User Id'},
      { field: 'Course_id', header: 'Course Id'}
    ];
    
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
}
