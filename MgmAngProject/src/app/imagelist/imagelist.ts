import { Component, OnInit } from '@angular/core';
import { Image, Imageservice } from '../imageservice';
import { intervalProvider } from 'rxjs/internal/scheduler/intervalProvider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../cartservice';

@Component({
  selector: 'app-imagelist',
  imports: [FormsModule,CommonModule],
  templateUrl: './imagelist.html',
  styleUrl: './imagelist.css',
})
export class Imagelist implements OnInit{
    images: Image[] = [];

//images!: Image[];
constructor(private imgservice:Imageservice,private cartservice:Cartservice)
{

}
ngOnInit(): void {
  this.imgservice.getImages().subscribe(data => {
     // this.images = data; // this is for apiurl
      this.images = data.images; 
    });
}
    
   /*
   ngOnInit(): void {

 
  this.loadImages();
 

}

loadImages(){
  this.imgservice.getImages().subscribe((data:any)=>{
     this.images = data.images;
  
  });
}
*/
 /*
 loadImages(){
  this.imgservice.getImages().subscribe({
    next:(data:any)=>{
      console.log("Image data:",data.images);
      this.images = data.images;
    },
    error:(err)=>{
      console.log("Error loading images:",err);
    }
  });
}
  */
addToCart(image:Image)
{
 this.cartservice.addToCart(image);
}
}

