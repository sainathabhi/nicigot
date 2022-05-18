import { Component, OnInit } from '@angular/core';
import { LoginreportService } from './loginreport.service';

@Component({
  selector: 'app-loginreport',
  templateUrl: './loginreport.component.html',
  styleUrls: ['./loginreport.component.scss']
})
export class LoginreportComponent implements OnInit {
  allUserLoginData: any = new Array()
  allUserLoginDataJson: any = new Array()
  colsUsers: any;
  constructor(private http:LoginreportService) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.userloginReport();
  }
userloginReport()
{
  console.log('userlogin')
  this.http.getData().subscribe(
    (res: any) => {
      this.allUserLoginData=res;
      this.allUserLoginData.forEach((y:any) =>
      {  
        var date = new Date(parseInt(y['event_time']));
        const localeTimeString = date.toLocaleString();

        var finalObj = Object.assign({"id": y['id']},
        {"client_id":y['client_id']},{"ip_address": y['ip_address']},{"event_time": localeTimeString}); 
        this.allUserLoginDataJson.push(finalObj);

      });
      console.log(this.allUserLoginDataJson)
  
    });

}

initializeColumns() {
  this.colsUsers = [
    { field: 'id', header: 'Id' },
    { field: 'client_id', header: 'Client Id'},
    { field: 'ip_address', header: 'Ip Address'},
    { field: 'event_time', header: 'Login Time'},
  ];
  
}
getEventValue($event:any) :string {
  return $event.target.value;
}
}
