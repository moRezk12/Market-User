import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cartProducts:any [] = [] ;
  total:any = 0 ;
  success:boolean = false ;

  constructor( private services:CartsService ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  minAmount(index:number) {
    this.cartProducts[index].quantity-- ;
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    this.getCartTotal();
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++ ;
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    this.getCartTotal();
  }

  detectChange(){
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    this.getCartTotal();
  }


  deleteProduct(index:number) {
    this.cartProducts.splice(index , 1) ;
    this.detectChange();
    this.getCartTotal();
  }

  clearCart(){
    this.cartProducts = [] ;
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    this.getCartTotal();
  }

  getCartTotal(){
    this.total = 0 ;
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity ;
    }
  }

  addCart(){
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id , quantity: item.quantity }
    })
    let model = {
      userId: 5 ,
      date: new Date(),
      products: products
    }

    this.services.createNewCart(model).subscribe( (res:any) => {
      this.success = true ;
    })
    setTimeout(() => {
      this.success = false ;
    }, 3000);
    console.log(model);

  }



}
