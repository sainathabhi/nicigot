import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-orgreport',
  templateUrl: './orgreport.component.html',
  styleUrls: ['./orgreport.component.scss']
})
export class OrgreportComponent implements OnInit {
  allOrgData: any = new Array()
  orgDetailInJson: any = new Array()
  orgDataResultArray: any = new Array()
  orgDate: any = new Array()
  orgDataResultArraydateEmp: any = new Array()
  orgtDateEmpCount: any = new Array()
  countriess: any = new Array()
  countries: any = new Array()
  selectedYearData: any = new Array()
  OrgEnrolmentMonthDateResultArray: any = new Array()
  OrgenrolmentMonthDate: any = new Array()
  OrgenrolementMonthdateEmp: any = new Array()
  OrgenrolmentMonthDateEmpCount	: any = new Array()
  enrolmentMonthDate: any = new Array()
  enrolementMonthdateEmp: any = new Array()
  enrolmentMonthDateEmpCount: any = new Array()
  selectedYearArray: any = new Array()
  selectedChartYearArray: any = new Array()
  yearChartClick: boolean = false;
  selectedChartsYearArray:any;
  selectedChartYear:any;
  selectedStateBatch:any;
  dateWiseMonthOrgChart:any;
  allOrgLength: any;
  colsOrgs:any;
  columns:any;
  dateWiseOrgChart:any
  adminRole: any;
  selectedYear:any
  colsOrgss:any;
  Month: any;
  constructor(private ht:DashboardreportService) { }

  ngOnInit(): void {
    this.selectedYear = '2022';
    this.adminRole= sessionStorage.getItem('adminRole'); 
    this.orgData();
    this.initializeColumns();
    this.initializeColumnss();
  }
  orgData()
  {
    this.allOrgData=[];
    this.orgDetailInJson=[];
    this.orgDataResultArray=[];
    this.orgDate=[];
    this.orgDataResultArraydateEmp=[];
    this.orgtDateEmpCount=[];
   this.ht.orgData().subscribe(
     (res: any) => {
       this.allOrgData=res.result.response.content;
       this.allOrgLength=this.allOrgData.length;
       console.log("org length")
       console.log(this.allOrgData)
       console.log(this.allOrgLength)
       this.allOrgData.forEach((y:any) =>
       {  
         var splitJoinDate =  y['createdDate'].split(' ');
         var splitJoinDateNew =  splitJoinDate[0].split('-');
         var year =splitJoinDateNew[0]
         var month =splitJoinDateNew[1]
         var day = splitJoinDateNew[2]
         var finalObj = Object.assign({"channel": y['channel']},
         {"orgName":y['orgName']},{"identifier": y['identifier']}, {"createdDate":day+'/'+month+'/'+year},{"year": year},{"month": month},{"day": day}); 
         this.orgDetailInJson.push(finalObj);
       });
       var groupByEnrolementDate = function(xs:any, key:any) {
        return xs.reduce(function(rv:any, x:any) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByEnrolmentDateResult=groupByEnrolementDate(this.orgDetailInJson, 'year')
      this.orgDataResultArray = Object.entries(groubedByEnrolmentDateResult)
      console.log("--------------Final Enrolement data wise data------------------------")
      console.log(this.orgDataResultArray);
      this.countriess=[];
      this.countries=[];
      this.selectedYearData=[];
      this.orgDataResultArray.forEach((y:any) =>
      {
        var finalObj1 = Object.assign({"name": y[0]}, {"code":  y[0]});
        this.countriess.push(finalObj1)
        this.countries= this.countriess.sort(function(a:any,b:any){ return a.name.localeCompare(b.name); });
        if(y[0]==this.selectedYear)
        {
        this.selectedYearData.push(y[1]);
        }
      this.orgDate.push(y[0]);
      this.orgDataResultArraydateEmp=y[1]
      this.orgtDateEmpCount.push(this.orgDataResultArraydateEmp.length);
    });
    if(this.countries.length>0)
    {
        this.selectedStateBatch = this.countries.find((country:any) => country.name === this.selectedYear);
  
    }
    this.OrgEnrolmentMonthDateResultArray=[];
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    
   var groubedByEnrolmentMonthDateResult=groupByEnrolementDate(this.selectedYearData[0], 'month')
   this.OrgEnrolmentMonthDateResultArray = Object.entries(groubedByEnrolmentMonthDateResult)
   this.OrgEnrolmentMonthDateResultArray.sort()
   this.OrgenrolmentMonthDate=[];
   this.OrgenrolementMonthdateEmp=[];
   this.OrgenrolmentMonthDateEmpCount=[];
   this.enrolmentMonthDate=[];
   this.enrolementMonthdateEmp=[];
   this.OrgEnrolmentMonthDateResultArray.forEach((y:any) =>
      {
     if(y[0]=='01')
     {
      this.Month='Jan'
     } 
     else if(y[0]=='02')
     {
      this.Month='Feb'
     } 
     else if(y[0]=='03')
     {
      this.Month='Mar'
     }
     else if(y[0]=='04')
     {
      this.Month='Apr'
     }
     else if(y[0]=='05')
     {
      this.Month='May'
     }
     else if(y[0]=='06')
     {
      this.Month='Jun'
     }
     else if(y[0]=='07')
     {
      this.Month='Jul'
     }
     else if(y[0]=='08')
     {
      this.Month='Aug'
     }
     else if(y[0]=='09')
     {
      this.Month='Sep'
     } 
     else if(y[0]=='10')
     {
      this.Month='Oct'
     }
     else if(y[0]=='11')
     {
      this.Month='Nov'
     }
      else if(y[0]=='12')
     {
      this.Month='Dec'
     }
      this.enrolmentMonthDate.push(this.Month);
      this.enrolementMonthdateEmp=y[1];
      this.enrolmentMonthDateEmpCount.push(this.enrolementMonthdateEmp.length);
    });
   this.showOrgDataGraph();
 
     },
   );
  }
  OnChangeState(e:any)
  {
    console.log(e)
    this.selectedYearArray=[];
  console.log(this.orgDataResultArray)
  this.orgDataResultArray.forEach((y:any) =>
  {
    if(y[0] == e.value['code'])
    {
      this.selectedYearArray.push(y[1]);
    }
  });
  console.log(this.selectedYearArray)
this.OrgEnrolmentMonthDateResultArray=[];
var groupByEnrolementDate = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
debugger
var groubedByEnrolmentMonthDateResult=groupByEnrolementDate(this.selectedYearArray[0], 'month')
this.OrgEnrolmentMonthDateResultArray = Object.entries(groubedByEnrolmentMonthDateResult)
this.OrgEnrolmentMonthDateResultArray.sort()
this.OrgenrolmentMonthDate=[];
this.OrgenrolementMonthdateEmp=[];
this.OrgenrolmentMonthDateEmpCount=[];
this.enrolmentMonthDate=[];
this.enrolementMonthdateEmp=[];
this.enrolmentMonthDateEmpCount=[];
this.OrgEnrolmentMonthDateResultArray.forEach((y:any) =>
  {
 if(y[0]=='01')
 {
  this.Month='Jan'
 } else if(y[0]=='02')
 {
  this.Month='Feb'
 } else if(y[0]=='03')
 {
  this.Month='Mar'
 }else if(y[0]=='04')
 {
  this.Month='Apr'
 }else if(y[0]=='05')
 {
  this.Month='May'
 }else if(y[0]=='06')
 {
  this.Month='Jun'
 }else if(y[0]=='07')
 {
  this.Month='Jul'
 }else if(y[0]=='08')
 {
  this.Month='Aug'
 }else if(y[0]=='09')
 {
  this.Month='Sep'
 } else if(y[0]=='10')
 {
  this.Month='Oct'
 }else if(y[0]=='11')
 {
  this.Month='Nov'
 } else if(y[0]=='12')
 {
  this.Month='Dec'
 }
  this.enrolmentMonthDate.push(this.Month);
  this.enrolementMonthdateEmp=y[1];
  this.enrolmentMonthDateEmpCount.push(this.enrolementMonthdateEmp.length);
});
this.showMonthOrgDataGraph();
  }
  onYearChartClick(e:any)
  {
    this.selectedChartYear=e.name
    this.yearChartClick=true;
    this.selectedChartYearArray=[];
   // this.orgDetailInJson=[];
  
    this.orgDataResultArray.forEach((y:any) =>
    {
      if(y[0] == e.name)
      {
        this.selectedChartYearArray.push(y[1]);
      }
    });
    this.allOrgLength=this.selectedChartYearArray[0].length;
    this.selectedChartsYearArray=this.selectedChartYearArray[0]; 
    console.log(this.selectedChartsYearArray);
   // console.log(this.selectedChartYearArray );

console.log(e.name);
  }
  initializeColumns() {
    this.colsOrgs = [
      { field: 'identifier', header: 'Organization Id', width: '50px' },
      { field: 'channel', header: 'Channel', width: '50px' },
      { field: 'orgName', header: 'Organization Name', width: '50px' },
      { field: 'createdDate', header: 'Created Date (dd/mm/yyyy)', width: '50px' },
    ];
  }
  initializeColumnss() {
    this.colsOrgss = [
      { field: 'identifier', header: 'Organization Id', width: '50px' },
      { field: 'channel', header: 'Channel', width: '50px' },
      { field: 'orgName', header: 'Organization Name', width: '50px' },
      { field: 'createdDate', header: 'Created Date (dd/mm/yyyy)', width: '50px' },
    ];
    this.columns = [
      { title: "Organization Id", dataKey: "identifier" },
      { title: "Channel", dataKey: "channel" },
      { title: "Organization Name", dataKey: "orgName" },
      { title: "Created Date", dataKey: "createdDate" }
    ];
  }
  

  showOrgDataGraph()
  {
  
    this.dateWiseOrgChart = {
      title: {
             show: false,
             left: 'center',
             text: 'COURSE  ENROLMENT STATICS GRAPH  ',
           },
      tooltip: {
             trigger: 'axis'
           },
      toolbox: {
            show: true,
            orient: 'vertical',
        //  left: 'right',
            itemGap: 25,
            top: '3%',
            itemSize: "20",
            right: "1%",
            feature: {
              myTool1: {
                show: true,
               title: 'About The Graph Info About The Graph Info About The Graph Info </br>About The Graph Info About The Graph Info <br>About The Graph Info About The Graph Info...' ,
                icon: 'image://assets/imgs/background/infoo.png',
                onclick: function (){
                    alert('myToolHandler1')
                }
            },
            myTool :  { //Custom tool myTool
              show :  true ,
              title :  'Full screen display' ,
              icon :  'image://assets/imgs/background/zoom-inn.png' , //this The string "image://" must be added in front of the picture path
              onclick :  function  ( ) {
  
                  //Generate full screen display chart
                  var formElement = <HTMLFormElement>document.getElementById('myModal');
                  formElement.style.display='block';
              }
          } ,
              mark: { show: true, },
              dataView: { show: true, iconStyle: {
                borderColor: "#06167F"
            }, readOnly: false },
              magicType: { show: true,iconStyle: {
                borderColor:"#DE3163"
  
              }, type: ['line', 'bar'] },
              restore: { show: true,iconStyle: {
                borderColor: "#FF8F00"
            }, },
              saveAsImage: { show: true, iconStyle: {
                borderColor: "green"
            }, }
            },
            showTitle: false,
            tooltip: { // same as option.tooltip
              show: true,
              formatter: function (param:any) {
                  return '<div>' + param.title + '</div>'; // user-defined DOM structure
              },
              backgroundColor: '#222',
              textStyle: {
                  fontSize: 12,
                  color:'white',
              },
              extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // user-defined CSS styles
          }
          },
          axisLabel: {
            interval:0,
            rotate: 65,
        },
      xAxis: {
        type: 'category',
        data: this.orgDate
      },
      yAxis: {
        type: 'value',
        axisLine:{                 //Coordinate axis
          show:true,             //Show Axis axis or not
          onZero:true,           //Whether the axis of X-axis or Y-axis is on the 0 scale of another axis is valid only when the other axis is a numerical axis and contains the 0 scale
      },
      },
      series: [
        {
          data: this.orgtDateEmpCount,
          type: 'line',
          color:'#5470c6'
  
        //  color: '#8E24AA'
        }
      ]
    };
  this.showMonthOrgDataGraph();
  }
  showMonthOrgDataGraph()
  {
  
    this.dateWiseMonthOrgChart = {
      title: {
             show: false,
             left: 'center',
             text: 'COURSE  ENROLMENT STATICS GRAPH  ',
           },
      tooltip: {
             trigger: 'axis'
           },
      toolbox: {
            show: true,
            orient: 'vertical',
        //  left: 'right',
            itemGap: 25,
            top: '3%',
            itemSize: "20",
            right: "1%",
            feature: {
              myTool1: {
                show: true,
               title: 'About The Graph Info About The Graph Info About The Graph Info </br>About The Graph Info About The Graph Info <br>About The Graph Info About The Graph Info...' ,
                icon: 'image://assets/imgs/background/infoo.png',
                onclick: function (){
                    alert('myToolHandler1')
                }
            },
            myTool :  { //Custom tool myTool
              show :  true ,
              title :  'Full screen display' ,
              icon :  'image://assets/imgs/background/zoom-inn.png' , //this The string "image://" must be added in front of the picture path
              onclick :  function  ( ) {
  
                  //Generate full screen display chart
                  var formElement = <HTMLFormElement>document.getElementById('myModal');
                  formElement.style.display='block';
              }
          } ,
              mark: { show: true, },
              dataView: { show: true, iconStyle: {
                borderColor: "#06167F"
            }, readOnly: false },
              magicType: { show: true,iconStyle: {
                borderColor:"#DE3163"
  
              }, type: ['line', 'bar'] },
              restore: { show: true,iconStyle: {
                borderColor: "#FF8F00"
            }, },
              saveAsImage: { show: true, iconStyle: {
                borderColor: "green"
            }, }
            },
            showTitle: false,
            tooltip: { // same as option.tooltip
              show: true,
              formatter: function (param:any) {
                  return '<div>' + param.title + '</div>'; // user-defined DOM structure
              },
              backgroundColor: '#222',
              textStyle: {
                  fontSize: 12,
                  color:'white',
              },
              extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // user-defined CSS styles
          }
          },
          axisLabel: {
            interval:0,
            rotate: 65,
        },
      xAxis: {
        type: 'category',
        data: this.enrolmentMonthDate
      },
      yAxis: {
        type: 'value',
        axisLine:{                 //Coordinate axis
          show:true,             //Show Axis axis or not
          onZero:true,           //Whether the axis of X-axis or Y-axis is on the 0 scale of another axis is valid only when the other axis is a numerical axis and contains the 0 scale
      },
      },
      series: [
        {
          data: this.enrolmentMonthDateEmpCount,
          type: 'bar',
          color:'#5470c6'
  
        //  color: '#8E24AA'
        }
      ]
    };
  
  }
  exportPdf() {
    const doc = new jsPDF('p','pt');
    autoTable(doc, {
      columns: this.columns,
      body: this.orgDetailInJson,
      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: (dataArg) => {
      doc.text('Organization report', dataArg.settings.margin.left, 10);
      }
  });
    doc.save('Organization_report.pdf');
  }
  
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  
}
