import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginArray: any = new Array()
  loginUserData: any = new Array()
  credentialdata:any
  count:any
  adminRole: boolean = false;
 // csvUploadTime: any;
  userLogin: any;
  constructor(private formBuilder: FormBuilder,private router: Router,private http:LoginService) { }
  registerForm:any =  FormGroup;
  submitted = false;

  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
    this.http.tokenGenrate(this.registerForm['value']['usename'],this.registerForm['value']['password']).subscribe(
      (res: any) => {
      console.log(res)
      if(res.access_token)
      {
        this.credentialdata='';
        sessionStorage.setItem('loginToken', res.access_token);
        this.loginUserProfile(res.access_token,this.registerForm['value']['usename'])
       
      }
      },
      err =>{
        console.log(err)
        if(err.status==401)
        {
          this.credentialdata="The username or password you entered isn't correct."
        }
      } 
     
    );

    }

  }
  loginUserProfile(token:any,userEmail:any)
  {
    this.count='';
    this.http.userDeatail(token,userEmail).subscribe(
      (res: any) => {
        console.log(res.result.response.content[0].organisations[0].roles)


        if( res.result.response.content[0].organisations[0].roles.length > 0 ) {
          for( var i = 0; i < res.result.response.content[0].organisations[0].roles.length; i++ ) {            
             if(res.result.response.content[0].organisations[0].roles[i] =="MDO_ADMIN"){
              //sessionStorage.setItem('adminRole','present');  
              this.count=1;      
              }    
          }
        }
if(this.count==1)
{
  sessionStorage.setItem('adminRole','present'); 
}
else{
  sessionStorage.setItem('adminRole','notpresent'); 
}
      console.log(res.result.response.content[0]['userName'])
      sessionStorage.setItem('userName', res.result.response.content[0]['userName']);
      this.router.navigateByUrl("/dashboard");
      },
      err => console.log(err)
    );
  }
    //login form
    ngOnInit(): void {
      //login form
     //Add User form validations
     this.registerForm = this.formBuilder.group({
      usename: ['', [Validators.required]],
      password: ['', [Validators.required]],
      });
    }


}
