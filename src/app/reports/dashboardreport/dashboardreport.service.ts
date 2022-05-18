import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardreportService {
  constructor(private http: HttpClient) { }
  userData(token:any)
  {
    
    var payload = "{\r\n    \"request\": {\r\n        \"filters\": {\r\n\r\n        },\r\n        \"facets\": [],\r\n        \"sortBy\": {\r\n            \"createdDate\": \"Desc\"\r\n        },\r\n        \"limit\": 10000\r\n    }\r\n}"
    var headers = {
      'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110',
      'X-Authenticated-User-Token':token,
      'Content-Type': 'application/json'
    } 
    return this.http.post('https://karmayogi.nic.in/api/user/v1/search', payload, {headers});
  }
  orgData()
  {
    var payload = "{\n    \"request\": {\n        \"filters\": {\n           \"isRootOrg\": true\n        },\n        \"fields\": [],\n        \"sortBy\": {\n            \"createdDate\": \"Desc\"\n        },\n        \"limit\": 1000\n    }\n}"
    var headers = {
    'authorization': "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110",
    'cache-control': "no-cache",
    'content-type': "application/json",
    'postman-token': "f4ee3d30-7b94-7d77-0d45-f1bbc3a5fb8c"
    }
    return this.http.post('https://karmayogi.nic.in/api/org/v1/search', payload, {headers});
  }
  courseIndratData()
  {
    var payload = "{\r\n  \"locale\": [\r\n    \"en\"\r\n  ],\r\n  \"query\": \"\",\r\n  \"request\": {\r\n    \"query\": \"\",\r\n    \"filters\": {\r\n        \"status\": [\"draft\"],\r\n        \"contentType\": \"course\"\r\n    },\r\n    \"sort_by\": {\r\n      \"lastUpdatedOn\": \"desc\"\r\n    },\r\n    \"facets\": [\r\n      \"primaryCategory\",\r\n      \"status\",\r\n      \"mimeType\"\r\n    ],\r\n  \"limit\" : \"200\"\r\n\r\n  }\r\n}\t"
    var headers = {
      'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110',
      'Content-Type': 'application/json'
    }
    return this.http.post('https://karmayogi.nic.in/api/composite/v1/search', payload, {headers});
  
    
  }
  coursePublishedData()
  {
    var payload = "{\r\n  \"locale\": [\r\n    \"en\"\r\n  ],\r\n  \"query\": \"\",\r\n  \"request\": {\r\n    \"query\": \"\",\r\n    \"filters\": {\r\n        \"status\": [\"live\"],\r\n        \"contentType\": \"course\"\r\n    },\r\n    \"sort_by\": {\r\n      \"lastUpdatedOn\": \"desc\"\r\n    },\r\n    \"facets\": [\r\n      \"primaryCategory\",\r\n      \"status\",\r\n      \"mimeType\"\r\n    ],\r\n  \"limit\" : \"200\"\r\n\r\n  }\r\n}\t"
    var headers = {
      'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5RVZPODkwNHZzV0pMdWhxanN6aVFLeEVZTFdZZ0MwSiJ9.0l5-vg_d_IHtNPfhp6l4OM-dmAG8azpV2amxDYLu110',
      'Content-Type': 'application/json'
    }
    return this.http.post('https://karmayogi.nic.in/api/composite/v1/search', payload, {headers});
    
  }
  userInvolveInCourse()
  {
    return this.http.get('/assets/userCourses.json');
  }
  getData() {

    return this.http.get('/assets/final.json');


  }
}
