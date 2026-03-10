/*
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from './cartitem';
import { Image } from './imageservice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {

  private cartItems: CartItem[] = [];
  private isBrowser: boolean;

  // Cart count observable
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http:HttpClient) {
    const savedCart = localStorage.getItem('cart');
  this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    }

    // Emit initial count
    this.updateCartCount();
  }

  // ----------------------------
  // Add Item
  // ----------------------------
  /* modify code
  addToCart(image: Image): void {
    const existing = this.cartItems.find(item => item.image.id === image.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ image, quantity: 1 });
    }

    this.saveCart();
    this.updateCartCount();
  }
    */
   /*
   addToCart(image: Image): void {

  const token = localStorage.getItem("token");

  if(!token)
  {
      // Guest user → localStorage

      const existing = this.cartItems.find(item => item.image.id === image.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.cartItems.push({ image, quantity: 1 });
      }

      this.saveCart();
      this.updateCartCount();

  }
  else
  {
      // Logged user → Redis API

      const user = JSON.parse(localStorage.getItem("user")!);

      let data={
        userId:user.id,
        productId:image.id,
        price:image.price,
        quantity:1
      }

      this.http.post("https://localhost:7067/api/Cart/add",data)
      .subscribe(res=>{
        console.log("Saved in Redis",res)
      })

  }

}

  // ----------------------------
  // Increase Quantity
  // ----------------------------
  increaseQuantity(id: number): void {
    const item = this.cartItems.find(i => i.image.id === id);
    if (item) {
      item.quantity++;
      this.saveCart();
      this.updateCartCount();
    }
  }

  // ----------------------------
  // Decrease Quantity
  // ----------------------------
  decreaseQuantity(id: number): void {
    const item = this.cartItems.find(i => i.image.id === id);

    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.saveCart();
        this.updateCartCount();
      }
    }
  }

  // ----------------------------
  // Remove Item
  // ----------------------------
  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.image.id !== id);
    this.saveCart();
    this.updateCartCount();
  }

  // ----------------------------
  // Get Cart Items
  // ----------------------------
  getCartItems(): CartItem[] {
    return [...this.cartItems]; // return copy (best practice)
  }

  // ----------------------------
  // Get Total Price
  // ----------------------------
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.image.price * item.quantity),
      0
    );
  }

  // ----------------------------
  // Save Cart (SSR Safe)
  // ----------------------------
  private saveCart(): void {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  // ----------------------------
  // Update Cart Count
  // ----------------------------
  private updateCartCount(): void {
    const total = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.cartCountSubject.next(total);
  }
}
  */
 import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from './cartitem';
import { Image } from './imageservice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {

  private cartItems: CartItem[] = [];
  private isBrowser: boolean;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    // Load cart from localStorage only in browser
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    }

    this.updateCartCount();
  }

  // ----------------------------
  // Add Item
  // ----------------------------
  addToCart(image: Image): void {

    if (!this.isBrowser) return;

    const token = localStorage.getItem("token");

    
    if (!token) {

      // Guest user → localStorage
      const existing = this.cartItems.find(item => item.image.id === image.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.cartItems.push({ image, quantity: 1 });
      }

      this.saveCart();
      this.updateCartCount();

    } else {

      // Logged user → Redis API
      const user = JSON.parse(localStorage.getItem("user")!);

      let data = {
        userId: user.id,
        productId: image.id,
        price: image.price,
        quantity: 1
      };

      this.http.post("https://localhost:7067/api/Cart/add", data)
        .subscribe(res => {
          console.log("Saved in Redis", res);
        });

    }
  }

  // ----------------------------
  // Increase Quantity
  // ----------------------------
  increaseQuantity(id: number): void {

    const item = this.cartItems.find(i => i.image.id === id);

    if (item) {
      item.quantity++;
      this.saveCart();
      this.updateCartCount();
    }
  }

  // ----------------------------
  // Decrease Quantity
  // ----------------------------
  decreaseQuantity(id: number): void {

    const item = this.cartItems.find(i => i.image.id === id);

    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.saveCart();
        this.updateCartCount();
      }
    }
  }

  // ----------------------------
  // Remove Item
  // ----------------------------
  removeFromCart(id: number): void {

    this.cartItems = this.cartItems.filter(item => item.image.id !== id);

    this.saveCart();
    this.updateCartCount();
  }

  // ----------------------------
  // Get Cart Items
  // ----------------------------
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // ----------------------------
  // Get Total Price
  // ----------------------------
  getTotalPrice(): number {

    return this.cartItems.reduce(
      (sum, item) => sum + (item.image.price * item.quantity),
      0
    );
  }

  // ----------------------------
  // Save Cart
  // ----------------------------
  private saveCart(): void {

    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

  }

  // ----------------------------
  // Update Cart Count
  // ----------------------------
  private updateCartCount(): void {

    const total = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.cartCountSubject.next(total);
  }

}