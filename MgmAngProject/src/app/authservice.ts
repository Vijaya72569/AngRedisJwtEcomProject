import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  apiUrl="https://localhost:7067/api/Users";
  constructor(private http:HttpClient,private router:Router)
  {}
  login(data:any){
    return this.http.post(this.apiUrl+"/login",data)
  }
  signin(data:any){
    return this.http.post(this.apiUrl+"/register",data)
  }
   logout(){

    // remove login data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optional
    localStorage.removeItem("cart");
    console.log("remove localstorage");

    alert("Logged Out Successfully");

    this.router.navigate(['/login']);
  }

}
