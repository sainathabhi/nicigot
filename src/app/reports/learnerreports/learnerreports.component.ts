import { Component, OnInit } from '@angular/core';
import { DashboardreportService } from '../dashboardreport/dashboardreport.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-learnerreports',
  templateUrl: './learnerreports.component.html',
  styleUrls: ['./learnerreports.component.scss']
})
export class LearnerreportsComponent implements OnInit {
  tokenGenrate:any;
  allUserData: any = new Array()
  learnerListInJson: any = new Array()
  EnrolmentDateResultArray: any = new Array()
  userLearnerdetailInJson: any = new Array()
  enrolmentDate: any = new Array()
  enrolementdateEmp: any = new Array()
  enrolmentDateEmpCount: any = new Array()
  selectedYearData: any = new Array()
  countriess: any = new Array()
  countries: any = new Array()
  enrolmentMonthDate: any = new Array()
  enrolementMonthdateEmp: any = new Array()
  enrolmentMonthDateEmpCount: any = new Array()
  EnrolmentMonthDateResultArray: any = new Array()
  dateWiseEnrolementChart:any;
  selectedStateBatch:any;
  adminRole:any;
  columns:any;
  colsUsers:any;
  selectedYear:any;
  Month: any;
  allLearnerDataLength: any;
  constructor(private http:DashboardreportService) { }

  ngOnInit(): void {
    this.selectedYear = '2022';
    this.adminRole= sessionStorage.getItem('adminRole'); 
    this.tokenGenrate=sessionStorage.getItem('loginToken');
    this.learnerReport(this.tokenGenrate);
    this.initializeColumns();
  }
learnerReport(token:any)
{
  this.allUserData=[];
  this.learnerListInJson=[];
  this.userLearnerdetailInJson=[];
  this.enrolmentDate=[];
  this.enrolmentDateEmpCount=[];
  this.http.userData(token).subscribe(
    (res: any) => {
      console.log(res.result.response.content);
      this.allUserData=res.result.response.content;
      this.allUserData.forEach((y:any) =>
      {  
       if(y.organisations[0].roles.length>0)
       {
        for( var i = 0; i < y.organisations[0].roles.length; i++ ) {            
          if(y.organisations[0].roles[i] =="PUBLIC"){
          this.learnerListInJson.push(y);         
            }        
          }
       }  
    })
    this.allLearnerDataLength=this.learnerListInJson.length;
    this.learnerListInJson.forEach((y:any) =>
    {  
      var splitJoinDate =  y.organisations[0]['orgjoindate'].split(' ');
      var splitJoinDateNew =  splitJoinDate[0].split('-');
      var year =splitJoinDateNew[0]
      var month =splitJoinDateNew[1]
      var day = splitJoinDateNew[2]
      var finalObj = Object.assign({"UserName": y['firstName']+' '+y['lastName']},
      {"email":y['email']},{"orgName": y.organisations[0]['orgName']},{"orgJoinDate": splitJoinDate[0]}, {"year": year},{"month": month},{"day": day}); 
      this.userLearnerdetailInJson.push(finalObj);
    });
    console.log(this.userLearnerdetailInJson)
   
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByEnrolmentDateResult=groupByEnrolementDate(this.userLearnerdetailInJson, 'year')
    this.EnrolmentDateResultArray = Object.entries(groubedByEnrolmentDateResult)
    console.log(this.EnrolmentDateResultArray);
    this.selectedYearData=[];
    this.countriess=[];
    this.countries=[];
    this.EnrolmentDateResultArray.forEach((y:any) =>
    {
      var finalObj1 = Object.assign({"name": y[0]}, {"code":  y[0]});
      this.countriess.push(finalObj1)
      this.countries= this.countriess.sort(function(a:any,b:any){ return a.name.localeCompare(b.name); });
      if(y[0]==this.selectedYear)
      {
      this.selectedYearData.push(y[1]);
      }
  //  this.enrolmentDate.push(y[0]);
   // this.enrolementdateEmp=y[1]
   
    //this.enrolmentDateEmpCount.push(this.enrolementdateEmp.length);
  });
  if(this.countries.length>0)
  {
      this.selectedStateBatch = this.countries.find((country:any) => country.name === this.selectedYear);

  }
  this.EnrolmentMonthDateResultArray=[];
  var groupByEnrolementDate = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
 var groubedByEnrolmentMonthDateResult=groupByEnrolementDate(this.selectedYearData[0], 'month')
 this.EnrolmentMonthDateResultArray = Object.entries(groubedByEnrolmentMonthDateResult)
 this.EnrolmentMonthDateResultArray.sort()
 this.enrolmentMonthDate=[];
 this.enrolementMonthdateEmp=[];
 this.enrolmentMonthDateEmpCount=[];
 this.EnrolmentMonthDateResultArray.forEach((y:any) =>
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
   // this.enrolmentMonthDate.push(this.Month);
    this.enrolementMonthdateEmp=y[1];
   // this.enrolmentMonthDateEmpCount.push(this.enrolementMonthdateEmp.length);
    this.enrolmentMonthDateEmpCount.push({"value":this.enrolementMonthdateEmp.length,"name":this.Month} );
  });
  this.showEnrolementGraph();
  })
}
OnChangeState(e:any)
{
console.log(e)
}
initializeColumns() {
  this.colsUsers = [
    { field: 'UserName', header: 'Name', width: '50px' },
   // { field: 'email', header: 'Email', width: '50px' },
    { field: 'orgName', header: 'Organization Name', width: '50px' },
    { field: 'orgJoinDate', header: 'Organization Join Date', width: '50px' },
  ];
  this.columns = [
    { title: "UserName", dataKey: "UserName" },
//    { title: "email", dataKey: "email" },
    { title: "orgName", dataKey: "orgName" },
    { title: "orgJoinDate", dataKey: "orgJoinDate" },
  ]; 
}
showEnrolementGraph()
{
  this.dateWiseEnrolementChart = {
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'

    },
   
    toolbox: {
      show: true,
      orient: 'vertical',
    //  left: 'right',
      itemGap: 25,
      top: '3%',
      itemSize: "20",
      right: "1.5%",
      feature: {
        myTool1: {
          show: true,
          title :  'About The Graph Info...' ,
        //   emphasis:{
        //     iconStyle: {
        //         borderColor: "blue",

        //     },
        // },

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
          debugger
            //Generate full screen display chart
            var formElement = <HTMLFormElement>document.getElementById('myModal4');
            formElement.style.display='block';
        }
    } ,
        // mark: { show: true, },
        dataView: { show: true, iconStyle: {
          borderColor: "#06167F"
      }, readOnly: false },
        // magicType: { show: true,iconStyle: {
        //   borderColor:"#DE3163"

        // }, type: ['line', 'bar'] },
      //   restore: { show: true,iconStyle: {
      //     borderColor: "#FF8F00"
      // }, },
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
    series: [
      {
        type: 'pie',     
         radius: '60%',    
      //  roseType: 'area',      
        data: this.enrolmentMonthDateEmpCount,
        label: {
          formatter: '  {b|{b}：}{c}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
           
          }
        },
      }
    ]
  };
  

}

getEventValue($event:any) :string {
  return $event.target.value;
}
exportPdf() {
  const doc = new jsPDF('p','pt');
  autoTable(doc, {
    columns: this.columns,
    body: this.userLearnerdetailInJson,
    margin: { horizontal: 10 },
    styles: { overflow: "linebreak" },
    theme: "striped",
    showHead: "everyPage",
    didDrawPage: (dataArg) => {
    doc.text('Learners report', dataArg.settings.margin.left, 10);
    }
});
  doc.save('Learners_Report.pdf');
}
}
