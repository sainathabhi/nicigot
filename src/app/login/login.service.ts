import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  getUserData() {
    return this.http.get('/assets/user.json');
  }
  tokenGenrate(userName:any,password:any)
  {
    
    var payload='client_id=admin-cli&password='+password+'&grant_type=password&username='+userName
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110'
    }
    return this.http.post('https://karmayogi.nic.in/auth/realms/sunbird/protocol/openid-connect/token',payload, {headers});
  }
  userDeatail(token:any,userEmail:any)
  {

    var payload= {
      "request": {
        "filters": {
          "email": userEmail
        },
        "fields": [],
        "sortBy": {
          "createdDate": "Desc"
        }
      }
    }
    var headers = {
      'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110',
      'X-Authenticated-User-Token':token,
      'Content-Type': 'application/json'
    } 
    return this.http.post('https://karmayogi.nic.in/api/user/v1/search', payload, {headers});
  }
}
