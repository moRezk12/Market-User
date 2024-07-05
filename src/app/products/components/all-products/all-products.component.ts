import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {


  products:product[] = [] ;
  categories:string[] = [] ;
  loading:boolean = false ;
  cartProducts:any[] = [] ;


  constructor(private serv:ProductsService){}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts () {
    this.loading = true ;
    this.serv.getAllProducts().subscribe((res :any ) => {
      console.log(res);
      this.products = res ;
      this.loading = false ;

    }, error => {
      alert("Error") ;
      this.loading = false ;

    })
  }

  getCategories () {
    this.loading = true ;
    this.serv.getAllCategories().subscribe((res :any ) => {
      console.log(res);
      this.categories = res ;
      this.loading = false ;
    }, error => {
      alert("Error") ;
      this.loading = false ;
    })
  }

  filterCategories(event : any ) {
    let value = event.target.value ;
    console.log(value);

    (value == "all") ? this.getProducts() : this.getProductCategorie(value);

    // if(value === "all"){
    //   this.getProducts();
    // }
    // else{
    //   this.getProductCategorie(value);
    // }
  }

  getProductCategorie(keyword : any ){
    this.loading = true ;
    this.serv.getProductByCategories(keyword).subscribe((res:any) =>{
      this.products = res ;
      this.loading = false ;
    })
  }

  addToCart(event:any){
    // console.log(event);
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exit = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exit){
        alert(" Product is already in your cart  ")
      }
      else{
        this.cartProducts.push(event);
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    }

  }




}
