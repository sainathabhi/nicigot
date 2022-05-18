import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  tokenGenrate:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.tokenGenrate=sessionStorage.getItem('loginToken');
    const expiry = (JSON.parse(atob(this.tokenGenrate.split('.')[1]))).exp;
    console.log(expiry);
    console.log("sesiontime")
    //let milliseconds = new Date().valueOf();
    let milliseconds =Math.floor((new Date).getTime() / 1000)
    if(expiry<milliseconds)
    {
      this.router.navigateByUrl("/logout");
    }
   console.log(milliseconds);   
  }
  
  title = 'nicigot';
}
