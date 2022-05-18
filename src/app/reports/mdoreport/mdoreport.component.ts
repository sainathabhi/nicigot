import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-mdoreport',
  templateUrl: './mdoreport.component.html',
  styleUrls: ['./mdoreport.component.scss']
})
export class MdoreportComponent implements OnInit {
  allMdoData: any = new Array()
  mdoListInJson: any = new Array()
  mdodetailInJson: any = new Array()
  mdoDateResultArray: any = new Array()
  mdoDate: any = new Array()
  mdoDateEmp: any = new Array()
  mdoDateEmpCount: any = new Array()
  countriess: any = new Array()
  countries: any = new Array()
  selectedYearData: any = new Array()
  enrolmentMonthDate: any = new Array()
  enrolementMonthdateEmp: any = new Array()
  enrolmentMonthDateEmpCount: any = new Array()
  selectedYearArray: any = new Array()
  selectedChartYearArray: any = new Array()
  MdoEnrolmentMonthDateResultArray: any = new Array()
  yearChartClick: boolean = false;
  allMdoDataLength: any;
  selectedChartsYearArray:any;
  dateWiseEnrolementChart: any;
  dateWiseMonthMdoChart: any;
  selectedStateBatch:any;
  colsUsers:any
  tokenGenrate: any;
  selectedChartYear:any;
  adminRole: any;
  columns:any;
  selectedYear: any
  Month: any;;

  constructor(private htp:DashboardreportService) { }

  ngOnInit(): void {
    this.selectedYear = '2022';
    this.adminRole= sessionStorage.getItem('adminRole'); 
    this.tokenGenrate=sessionStorage.getItem('loginToken');
    this.orgData(this.tokenGenrate);
    this.initializeColumns();
  }
  orgData(token:any)
  { 
    this.allMdoData=[];
    this.mdoListInJson=[];
    this.mdoDateResultArray=[];
    this.mdodetailInJson=[];
    this.htp.userData(token).subscribe(
     (res: any) => {
       this.allMdoData=res.result.response.content;
       console.log( this.allMdoData)
       this.allMdoDataLength=this.allMdoData.length;
       this.allMdoData.forEach((y:any) =>
       {  
        if(y.organisations[0].roles.length>0)
        {
         for( var i = 0; i < y.organisations[0].roles.length; i++ ) {            
           if(y.organisations[0].roles[i] =="MDO_ADMIN"){
           this.mdoListInJson.push(y);         
            }        
         }
        }      
       });
       this.allMdoDataLength=this.mdoListInJson.length;
       this.mdoListInJson.forEach((y:any) =>
       {  
         console.log(y)
         var splitJoinDate =  y.organisations[0]['orgjoindate'].split(' ');
         var splitJoinDateNew =  splitJoinDate[0].split('-');
         var year =splitJoinDateNew[0]
         var month =splitJoinDateNew[1]
         var day = splitJoinDateNew[2]
         var finalObj = Object.assign({"UserName": y['firstName']+' '+y['lastName']},
         {"email":y['email']},{"orgName": y.organisations[0]['orgName']},{"orgJoinDate": splitJoinDate[0]}, {"year": year},{"month": month},{"day": day}); 
         this.mdodetailInJson.push(finalObj);
       });

console.log("mdo  listttttttttttttttttttttt")
       console.log(this.mdodetailInJson);
  // this.showOrgDataGraph();
 
  var groupByEnrolementDate = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var groubedByEnrolmentDateResult=groupByEnrolementDate(this.mdodetailInJson, 'year')
  this.mdoDateResultArray = Object.entries(groubedByEnrolmentDateResult)
  console.log("--------------Final Enrolement data wise data------------------------")
  console.log(this.mdoDateResultArray);
  this.mdoDate=[];
  this.mdoDateEmp=[];
  this.mdoDateEmpCount=[];
  this.countriess=[];
  this.countries=[];
  this.selectedYearData=[];
  this.mdoDateResultArray.forEach((y:any) =>
  {
    var finalObj1 = Object.assign({"name": y[0]}, {"code":  y[0]});
    this.countriess.push(finalObj1)
    this.countries= this.countriess.sort(function(a:any,b:any){ return a.name.localeCompare(b.name); });
    if(y[0]==this.selectedYear)
    {
    this.selectedYearData.push(y[1]);
    }
    
  this.mdoDate.push(y[0]);
  this.mdoDateEmp=y[1]
  this.mdoDateEmpCount.push(this.mdoDateEmp.length);
});
if(this.countries.length>0)
    {
        this.selectedStateBatch = this.countries.find((country:any) => country.name === this.selectedYear);
  
    }
    this.MdoEnrolmentMonthDateResultArray=[];
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    
   var groubedByEnrolmentMonthDateResult=groupByEnrolementDate(this.selectedYearData[0], 'month')
   this.MdoEnrolmentMonthDateResultArray = Object.entries(groubedByEnrolmentMonthDateResult)
   this.MdoEnrolmentMonthDateResultArray.sort()
   this.enrolmentMonthDate=[];
   this.enrolementMonthdateEmp=[];
   this.enrolmentMonthDateEmpCount=[];
   this.MdoEnrolmentMonthDateResultArray.forEach((y:any) =>
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
   this.showMdoDataGraph();
 
console.log("ccccccccccccccccccccccc")
console.log(this.mdoDateEmpCount)
     },
   );
  }
  onYearChartClick(e:any)
  {
    console.log(e)
console.log(e.name);
if(e.name=='')
{
  e.name='2022';
}
this.selectedChartYear=e.name
this.yearChartClick=true;
this.selectedChartYearArray=[];
// this.orgDetailInJson=[];
console.log(this.mdoDateResultArray);
this.mdoDateResultArray.forEach((y:any) =>
{
  if(y[0] == e.name)
  {
    this.selectedChartYearArray.push(y[1]);
  }
});
this.allMdoDataLength=this.selectedChartYearArray[0].length;
this.selectedChartsYearArray=this.selectedChartYearArray[0]; 
console.log(this.selectedChartsYearArray);
// console.log(this.selectedChartYearArray );
  }
  showMdoDataGraph()
  {
    this.dateWiseEnrolementChart = {
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
        data: this.mdoDate
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
          data: this.mdoDateEmpCount,
          type: 'line',
         color: 'rgba(0, 0, 180, 0.4)',
          lineStyle: {
            color: '#5470C6',
            width: 5
          },
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
          },
          areaStyle: {},
        //  color: '#8E24AA'
        }
      ]
    };
this.showMonthMdoDataGraph();
  }
  OnChangeState(e:any)
  {
console.log(e)
    this.selectedYearArray=[];
  this.mdoDateResultArray.forEach((y:any) =>
  {
    if(y[0] == e.value['code'])
    {
      this.selectedYearArray.push(y[1]);
    }
  });
  console.log(this.selectedYearArray)
this.MdoEnrolmentMonthDateResultArray=[];
var groupByEnrolementDate = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
debugger
var groubedByEnrolmentMonthDateResult=groupByEnrolementDate(this.selectedYearArray[0], 'month')
this.MdoEnrolmentMonthDateResultArray = Object.entries(groubedByEnrolmentMonthDateResult)
this.MdoEnrolmentMonthDateResultArray.sort()
this.enrolmentMonthDate=[];
this.enrolementMonthdateEmp=[];
this.enrolmentMonthDateEmpCount=[];
this.MdoEnrolmentMonthDateResultArray.forEach((y:any) =>
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
this.showMonthMdoDataGraph();
  }
  showMonthMdoDataGraph()
  {
  
    this.dateWiseMonthMdoChart = {
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
 
  initializeColumns() {
    this.colsUsers = [
      { field: 'UserName', header: 'Name', width: '50px' },
     // { field: 'email', header: 'Email', width: '50px' },   
      { field: 'orgName', header: 'Organization Name', width: '50px' },
      { field: 'orgJoinDate', header: 'Organization Join Date', width: '50px' },
    ];  
    this.columns = [
      { title: "Name", dataKey: "UserName" },
     // { title: "Email", dataKey: "email" },    
      { title: "Organization Name", dataKey: "orgName" },
      { title: "Organization Join Date", dataKey: "orgJoinDate" },
    ];
  }
 
  exportPdf() {
    const doc = new jsPDF('p','pt');
    autoTable(doc, {
      columns: this.columns,
      body: this.mdodetailInJson,
      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: (dataArg) => {
      doc.text('MDO Report', dataArg.settings.margin.left, 10);
      }
  });
    doc.save('MDO_Report.pdf');
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
}
