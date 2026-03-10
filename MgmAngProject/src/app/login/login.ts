import { Component } from '@angular/core';
import { Authservice } from '../authservice';

import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email=""
  password=""
  errormessage=""
 // isactive= false
constructor(private auth:Authservice,private router:Router)
{

}
login()
{
  const data={
  email:this.email,
  password:this.password,
  
  }
  if (!this.email || !this.password) {
    this.errormessage = 'Email and password are required';
   // this.isactive=true
    return;
  }
    
  this.auth.login(data).subscribe((res:any)=>{
    console.log(res);
    localStorage.setItem("token",res.token);
    localStorage.setItem("user",JSON.stringify(res.user));
    alert(res.message+" "+ res.user.fullName);
    this.router.navigate(['/imagelist']);
  
});
  
    /*
   this.auth.login(data).subscribe({
    next:(res:any)=>{
      console.log(res);
    localStorage.setItem("token",res.token);
    localStorage.setItem("user",JSON.stringify(res.user));
    alert(res.message+" "+ res.user.fullName);
    this.router.navigate(['/imagelist']);
    },
    error:(err)=>{
      this.errormessage=err.error?.message || "login failed"
    }
   })
    */
}
signin(){
  this.router.navigate(['/register'])
}
}
