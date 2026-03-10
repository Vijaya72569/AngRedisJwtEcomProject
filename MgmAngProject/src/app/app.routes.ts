import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Imagelist } from './imagelist/imagelist';
import { Cart } from './cart/cart';
import { Register } from './register/register';

export const routes: Routes = [
    { path: 'login', component: Login },
  { path: 'imagelist', component: Imagelist },
  { path: 'cart', component: Cart },
  {path:'register', component:Register},
  {path:'',redirectTo:'/imagelist',pathMatch:'full'}

];
