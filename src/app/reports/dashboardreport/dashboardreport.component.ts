import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { DashboardreportService } from './dashboardreport.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-dashboardreport',
  templateUrl: './dashboardreport.component.html',
  styleUrls: ['./dashboardreport.component.scss']
})
export class DashboardreportComponent implements OnInit {
  
  allUserData: any = new Array()
  userdetailInJson: any = new Array()
  colsUsers:any
  userLength:any;
  adminRole:any;
  columns: any;
  selectedChartYear:any;
  selectedStateBatch:any;
  dateWiseEnrolementChart:any
  countries: any = new Array()
  countriess: any = new Array()
  enrolmentDate: any = new Array()
  enrolementdateEmp: any = new Array()
  enrolmentDateEmpCount: any = new Array()
  EnrolmentDateResultArray: any = new Array()
  EnrolmentMonthDateResultArray: any = new Array()
  userEnrolementDataArray: any = new Array()
  allOrgData: any = new Array()
  lang: any = new Array()
  mdoListInJson: any = new Array()
  orgtDateEmpCount: any = new Array()
  orgDataResultArraydateEmp: any = new Array()
  orgDataResultArray: any = new Array()
  selectedChartYearArray: any = new Array()
  learnerListInJson: any = new Array()
  allcourseIndratData: any = new Array()
  allcoursePublishedData: any = new Array();
  selectedYearData: any = new Array();
  enrolmentMonthDate: any = new Array();
  orgDetailInJson: any = new Array();
  mdodetailInJson: any = new Array();
  orgDate: any = new Array();
  enrolementMonthdateEmp: any = new Array();
  enrolmentMonthDateEmpCount: any = new Array();
  selectedYearArray: any = new Array();
  orgEnrolementDataArray: any = new Array();
  EnrolmentMdoDateResultArray: any = new Array();
  mdoDateEmp: any = new Array();
  mdoEnrolementDataArray: any = new Array();
  EnrolmentLearnersDateResultArray: any = new Array();
  learnersDateEmp: any = new Array();
  learnersEnrolementDataArray: any = new Array();
  yearChartClick: boolean = false;
  monthWiseEnrolementChart:any;
  allOrgLength: any;
  selectOnchangeYear:any;
  selectedChartsYearArray: any;
  dateWiseOrgEnrolementChart:any;
  dateWiseMdoEnrolementChart:any;
  dateWiseLearnersEnrolementChart:any;
  mdoAdminListLength: any;
  allcourseIndratDataLength: any;
  allcoursePublishedDataLength: any;
  tokenGenrate: any;
  input: any;
  learnerUserLength:any
  selectedYear:any;
  Month: any;
  constructor(private http:DashboardreportService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear();
    this.adminRole= sessionStorage.getItem('adminRole'); 
    this.tokenGenrate=sessionStorage.getItem('loginToken');
    this.dashBoardData(this.tokenGenrate);
    this.initializeColumns();   
  }
 
dashBoardData(token:any)
{ 
   this.userdetailInJson=[];
   this.enrolmentDate=[];
   this.enrolementdateEmp=[];
   this.enrolmentDateEmpCount=[];
   this.EnrolmentDateResultArray=[];
   this.mdoListInJson=[];
   this.learnerListInJson=[];
    this.http.userData(token).subscribe(
    (res: any) => {
      console.log(res.result.response.content);
      this.allUserData=res.result.response.content;
      this.userLength=this.allUserData.length;
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
      });
      this.learnerUserLength= this.learnerListInJson.length;

      this.allUserData.forEach((y:any) =>
    {  
      var splitJoinDate =  y['createdDate'].split(' ');
      var splitJoinDateNew =  splitJoinDate[0].split('-');
      var year =splitJoinDateNew[0]
      var month =splitJoinDateNew[1]
      var day = splitJoinDateNew[2]
      var finalObj = Object.assign({"UserName": y['firstName']+' '+y['lastName']},
      {"email":y['email']},{"userId": y['userId']},{"createdDate":day+'/'+month+'/'+year}, {"year": year},{"month": month},{"day": day}); 
      this.userdetailInJson.push(finalObj);
    });
    this.allUserData.forEach((y:any) =>
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
    this.mdoAdminListLength=this.mdoListInJson.length;
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByEnrolmentDateResult=groupByEnrolementDate(this.userdetailInJson, 'year')
    this.EnrolmentDateResultArray = Object.entries(groubedByEnrolmentDateResult)
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
    this.enrolementdateEmp=y[1];
    this.userEnrolementDataArray.push({"value":this.enrolementdateEmp.length,"name":y[0]} );
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
    this.enrolmentMonthDate.push(this.Month);
    this.enrolementMonthdateEmp=y[1];
    this.enrolmentMonthDateEmpCount.push(this.enrolementMonthdateEmp.length);
  });
  this.orgData();
    },
  );
}

 orgData()
 {
  this.allOrgData=[];
  this.orgDetailInJson=[];
  this.orgDataResultArray=[];
  this.orgDataResultArraydateEmp=[];
  this.orgtDateEmpCount=[];
  this.orgDate=[];
  this.orgEnrolementDataArray=[];
  this.http.orgData().subscribe(
    (res: any) => {
      this.allOrgData=res.result.response.content;
      console.log(this.allOrgData)
      this.allOrgLength=this.allOrgData.length;
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
      this.orgDataResultArray.forEach((y:any) =>
      {
      this.orgDate.push(y[0]);
      this.orgDataResultArraydateEmp=y[1]
      this.orgtDateEmpCount.push(this.orgDataResultArraydateEmp.length);
      this.orgEnrolementDataArray.push({"value":this.orgDataResultArraydateEmp.length,"name":y[0]} );
    });
    this.mdoDeatil();
  },
  );
 }
 mdoDeatil()
 {
  this.mdodetailInJson=[];
  this.mdoListInJson.forEach((y:any) =>
  {  
    var splitJoinDate =  y['createdDate'].split(' ');
    var splitJoinDateNew =  splitJoinDate[0].split('-');
    var year =splitJoinDateNew[0]
    var month =splitJoinDateNew[1]
    var day = splitJoinDateNew[2]
    var finalObj = Object.assign({"UserName": y['firstName']+' '+y['lastName']},
    {"email":y['email']},{"userId": y['userId']},{"createdDate":day+'/'+month+'/'+year}, {"year": year},{"month": month},{"day": day}); 
    this.mdodetailInJson.push(finalObj);
  });
  var groupByEnrolementDate = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var groubedByMdoEnrolmentDateResult=groupByEnrolementDate(this.mdodetailInJson, 'year')
  this.EnrolmentMdoDateResultArray = Object.entries(groubedByMdoEnrolmentDateResult)
  this.mdoDateEmp=[];
  this.mdoEnrolementDataArray=[];
  this.EnrolmentMdoDateResultArray.forEach((y:any) =>
  {  
  this.mdoDateEmp=y[1]
  this.mdoEnrolementDataArray.push({"value":this.mdoDateEmp.length,"name":y[0]} );
});
this.learnersDetail();
 }
 learnersDetail()
 {
  this.EnrolmentLearnersDateResultArray=[];
  this.learnerListInJson.forEach((y:any) =>
  {  
    var splitJoinDate =  y['createdDate'].split(' ');
    var splitJoinDateNew =  splitJoinDate[0].split('-');
    var year =splitJoinDateNew[0]
    var month =splitJoinDateNew[1]
    var day = splitJoinDateNew[2]
    var finalObj = Object.assign({"UserName": y['firstName']+' '+y['lastName']},
    {"email":y['email']},{"userId": y['userId']},{"createdDate":day+'/'+month+'/'+year}, {"year": year},{"month": month},{"day": day}); 
    this.mdodetailInJson.push(finalObj);
  });
  var groupByEnrolementDate = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var groubedByLearnersEnrolmentDateResult=groupByEnrolementDate(this.mdodetailInJson, 'year')
  this.EnrolmentLearnersDateResultArray = Object.entries(groubedByLearnersEnrolmentDateResult)
  this.learnersDateEmp=[];
  this.learnersEnrolementDataArray=[];
  this.EnrolmentLearnersDateResultArray.forEach((y:any) =>
  {  
  this.learnersDateEmp=y[1]
  this.learnersEnrolementDataArray.push({"value":this.learnersDateEmp.length,"name":y[0]} );
});
this.courseInDraft();
 }
 courseInDraft()
 {
  this.allcourseIndratData=[];
  this.http.courseIndratData().subscribe(
    (res: any) => {
      console.log("course in draft-------------")
      console.log(res)

      this.allcourseIndratData=res.result.content;
      console.log(this.allcourseIndratData)
      this.allcourseIndratDataLength=this.allcourseIndratData.length;
  this.courseInLive();

    },
  );
 }
 courseInLive()
 {
  this.allcoursePublishedData=[];
  this.http.coursePublishedData().subscribe(
    (res: any) => {
      this.allcoursePublishedData=res.result.content;
      console.log(this.allcoursePublishedData)
      this.allcoursePublishedDataLength=this.allcoursePublishedData.length;
  this.showEnrolementGraph();
 // this.showEnrolementMonthGraph();

    },
  );
 }

 showEnrolementGraph()
 {
   
   this.dateWiseEnrolementChart = {
     title: {
       show:false,
       text: 'Referer of a Website',
       subtext: 'Fake Data',
       left: 'center'
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
             var formElement = <HTMLFormElement>document.getElementById('myModal1');
             console.log(formElement)
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
     legend: {
       orient: 'vertical',
       left: 'left'
     },
     series: [
       {
         name: '',
         type: 'pie',
         radius: '70%',
         data: this.userEnrolementDataArray,
       //   label: {
       //     fontSize: 14,
       //     formatter: ' {b}：{c} '
       // },

       label: {
         formatter: '{a|{a}}  {b|{b}：}{c}  ',
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
           per: {
             color: '#fff',
             backgroundColor: '#4C5058',
             padding: [3, 4],
             borderRadius: 4
           }
         }
       },
      // radius: '50%',
   //    center: ['50%', '70%'],
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       },

     ]

   };

this.showOrgEnrolementGraph();
 }
 showOrgEnrolementGraph()
 {
  var colorPalette = ['#00b04f', '#ffbf00', 'ff0000'];
   this.dateWiseOrgEnrolementChart = {
     title: {
       show:false,
       text: 'Referer of a Website',
       subtext: 'Fake Data',
       left: 'center'
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
             var formElement = <HTMLFormElement>document.getElementById('myModal2');
             console.log(formElement)
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
     legend: {
       orient: 'vertical',
       left: 'left'
     },
     series: [
       {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      color: colorPalette,
         data: this.orgEnrolementDataArray,
       //   label: {
       //     fontSize: 14,
       //     formatter: ' {b}：{c} '
       // },
 
       label: {
         formatter: '{b|{b}：}{c}  ',
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
           per: {
             color: '#fff',
             backgroundColor: '#4C5058',
             padding: [3, 4],
             borderRadius: 4
           }
         }
       },
      // radius: '50%',
   //    center: ['50%', '70%'],
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       },

     ]

   };

this.showMdoEnrolementGraph();
 }

 showMdoEnrolementGraph()
 {
  var colorPalette = ['#FFC154', '#47B39C', 'ff0000'];
   this.dateWiseMdoEnrolementChart = {
     title: {
       show:false,
       text: 'Referer of a Website',
       subtext: 'Fake Data',
       left: 'center'
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
             var formElement = <HTMLFormElement>document.getElementById('myModal3');
             console.log(formElement)
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
     legend: {
       orient: 'vertical',
       left: 'left'
     },
     series: [
       {
         name: '',
         type: 'pie',
         radius: '70%',
         color: colorPalette,
         data: this.mdoEnrolementDataArray,
       //   label: {
       //     fontSize: 14,
       //     formatter: ' {b}：{c} '
       // },

       label: {
         formatter: '{a|{a}}  {b|{b}：}{c}  ',
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
           per: {
             color: '#fff',
             backgroundColor: '#4C5058',
             padding: [3, 4],
             borderRadius: 4
           }
         }
       },
      // radius: '50%',
   //    center: ['50%', '70%'],
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       },

     ]

   };

this.showLearnersEnrolementGraph();
 }
 showLearnersEnrolementGraph()
 {
  var colorPalette = ['#5BB2B3', '#ffbf00', 'ff0000'];
   this.dateWiseLearnersEnrolementChart = {
     title: {
       show:false,
       text: 'Referer of a Website',
       subtext: 'Fake Data',
       left: 'center'
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
             console.log(formElement)
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
     legend: {
       orient: 'vertical',
       left: 'left'
     },
     series: [
       {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      color: colorPalette,
         data: this.learnersEnrolementDataArray,
       //   label: {
       //     fontSize: 14,
       //     formatter: ' {b}：{c} '
       // },
 
       label: {
         formatter: '{b|{b}：}{c}  ',
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
           per: {
             color: '#fff',
             backgroundColor: '#4C5058',
             padding: [3, 4],
             borderRadius: 4
           }
         }
       },
      // radius: '50%',
   //    center: ['50%', '70%'],
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       },

     ]

   };


 }
showEnrolementMonthGraph()
{
  this.monthWiseEnrolementChart = {

    title: {
      show:false,
      left: 'center',
      text: 'COURSE CERTIFICATE ISSUED STATICS GRAPH',
    },

    tooltip: {

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
         title: 'About The Graph Info...About The Graph Info...' ,
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
            var formElement = <HTMLFormElement>document.getElementById('myModal2');
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

    xAxis: {
     // type: 'category',
     // name: "Category",
      nameLocation: "middle",

      axisLabel: {
        interval:0,
        rotate: 65,
    },

  ticks: {
      display:true,
      stepSize: 0,
      min: 0,
      autoSkip: false,
      fontSize: 11,
      padding: 12
  },
      data:this.enrolmentMonthDate,
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
        data:  this.enrolmentMonthDateEmpCount,
        type: 'bar',
        showBackground: true,
        color:"#728FCE"


      },
    ],
  };
  //this.completionCertificateIssue();
}

initializeColumns() {
  this.colsUsers = [
    { field: 'UserName', header: 'Name', width: '50px' },
    { field: 'userId', header: 'User Id', width: '50px' },
   // { field: 'email', header: 'Email', width: '50px' },
    { field: 'createdDate', header: 'Created Date (dd/mm/yyyy)', width: '50px' },
  ];
  
}

onYearChartClick(e:any)
{
  
  this.yearChartClick=true;
  this.selectedChartYearArray=[];
 // this.orgDetailInJson=[];

  this.EnrolmentDateResultArray.forEach((y:any) =>
  {
    if(y[0] == e.name)
    {
      this.selectedChartYearArray.push(y[1]);
    }
  });
  this.userLength=this.selectedChartYearArray[0].length;
  this.selectedChartsYearArray=this.selectedChartYearArray[0]; 
  console.log(this.selectedChartsYearArray);
 // console.log(this.selectedChartYearArray );

console.log(e.name);
}
initializeColumnsForPdf()
{
  this.columns = [
    { title: "UserName", dataKey: "UserName" },
    { title: "userId", dataKey: "User Id" },
    { title: "email", dataKey: "email" },
    { title: "createdDate", dataKey: "Created Date" }
  ];
}
getEventValue($event:any) :string {
  return $event.target.value;
}
closeModal(id:any)
{
  console.log(id)
  var formElement = <HTMLFormElement>document.getElementById(id);
  formElement.style.display='none';
}
exportPdf() {
  const doc = new jsPDF('p','pt');
  autoTable(doc, {
    columns: this.columns,
    body: this.userdetailInJson,
    margin: { horizontal: 10 },
    styles: { overflow: "linebreak" },
    theme: "striped",
    showHead: "everyPage",
    didDrawPage: (dataArg) => {
    doc.text('dashboard report', dataArg.settings.margin.left, 10);
    }
});
  doc.save('CourseWiseSummery.pdf');
}
}
