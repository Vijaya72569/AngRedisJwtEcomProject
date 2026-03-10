import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cartservice } from '../cartservice';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit
{
  cartCount:number=0;
constructor(private cartservice:Cartservice,private auth:Authservice)
{
}
ngOnInit(): void {
  this.cartservice.cartCount$.subscribe(count=>{
    this.cartCount=count;
  })
}
 logout(){
    this.auth.logout();
  }
isLoggedIn(){
  return !!localStorage.getItem("token");
}
}
