import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';

@Component({
  selector: 'app-coursepublished',
  templateUrl: './coursepublished.component.html',
  styleUrls: ['./coursepublished.component.scss']
})
export class CoursepublishedComponent implements OnInit {
  colsUsers: any;
  coursePublishedData: any = new Array()
  alloursePublishedDataJson: any = new Array()

  constructor(private httpss:DashboardreportService) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.coursePublishedreport();
  }
  coursePublishedreport()
{
  this.alloursePublishedDataJson=[];
  this.coursePublishedData=[];
  this.httpss.coursePublishedData().subscribe(
    (res: any) => {
      console.log(res)
      this.coursePublishedData=res.result.content;
      this.coursePublishedData.forEach((y:any) =>
      {  
        var splitJoinDate =  y['createdOn'].split('T');
        console.log(splitJoinDate)
        //var splitJoinDateNew =  splitJoinDate[0].split('-');
        var finalObj = Object.assign(
        {"id":y['identifier']},{"name": y['name']},{"creator": y['creator']},{"createdOn": splitJoinDate[0]}); 
        this.alloursePublishedDataJson.push(finalObj);

      });
      console.log(this.alloursePublishedDataJson)

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
