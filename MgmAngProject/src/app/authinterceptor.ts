/*
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token");

  if(token){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
  }

  return next(req);
};
*/

import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token");
  }

  if(token){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
  }

  return next(req);
};