import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';

@Component({
  selector: 'app-courseindraftreport',
  templateUrl: './courseindraftreport.component.html',
  styleUrls: ['./courseindraftreport.component.scss']
})
export class CourseindraftreportComponent implements OnInit {
  colsUsers: any;
  courseIndraftData: any = new Array()
  allourseIndraftDataJson: any = new Array()

  constructor(private httpss:DashboardreportService) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.courseIndraftreport();
  }
courseIndraftreport()
{
  this.httpss.courseIndratData().subscribe(
    (res: any) => {
      console.log(res)
      this.courseIndraftData=res.result.content;
      this.courseIndraftData.forEach((y:any) =>
      {  
        var splitJoinDate =  y['createdOn'].split('T');
        console.log(splitJoinDate)
        //var splitJoinDateNew =  splitJoinDate[0].split('-');
        var finalObj = Object.assign(
        {"id":y['identifier']},{"name": y['name']},{"creator": y['creator']},{"createdOn": splitJoinDate[0]}); 
        this.allourseIndraftDataJson.push(finalObj);

      });
      console.log(this.allourseIndraftDataJson)

    });
}
initializeColumns() {
  this.colsUsers = [
   
    { field: 'id', header: 'Id'},
    { field: 'name', header: 'Name'},
    { field: 'creator', header: 'Creator'},
    { field: 'createdOn', header: 'createdOn'}
  ];
  
}
getEventValue($event:any) :string {
  return $event.target.value;
}
}
