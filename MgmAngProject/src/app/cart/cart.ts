import { Component, OnInit } from '@angular/core';
import { Cartservice } from '../cartservice';
import { CartItem } from '../cartitem';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems:CartItem[]=[];
constructor(private cartservice:Cartservice)
{

}
ngOnInit(): void {
  this.loadCart();
}
loadCart():void
{
   this.cartItems=this.cartservice.getCartItems();
}
    increase(id: number): void {
    this.cartservice.increaseQuantity(id);
    this.loadCart();
  } 
  decrease(id: number): void {
    this.cartservice.decreaseQuantity(id);
    this.loadCart();
  }
    // get total price
    getTotalPrice(): number {
    return this.cartservice.getTotalPrice();
  }
 // remove cartitems
   remove(id: number): void {
    this.cartservice.removeFromCart(id);
    this.loadCart();
  }
}
