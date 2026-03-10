import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Image{
id:number;
url:string;
price:number;
}
@Injectable({
  providedIn: 'root',
})
export class Imageservice {
  constructor(private http:HttpClient)
  {

  }
  getImages(): Observable<{ images: Image[] }> {
  return this.http.get<{ images: Image[] }>('assets/db.json');
}
}
