import { Component } from '@angular/core';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fullName= ""
  email= ""
  password=""
constructor(private auth:Authservice,private router:Router){}
signin(){
let data={
  fullName:this.fullName,
  email:this.email,
  password:this.password

}
this.auth.signin(data).subscribe((res:any)=>{
  console.log(res.message);
this.router.navigate(["/login"]);
})
}
}
