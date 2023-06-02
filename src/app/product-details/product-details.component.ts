import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product, cart } from '../datatype';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData : undefined | product;
  productQuantity: number=1
  removeCart = false;
  cartData : product | undefined; 

  constructor(private activeRoute : ActivatedRoute, private product : ProductsService) { }

  ngOnInit(): void {

    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((res)=>{
      this.productData = res;

      let cartData = localStorage.getItem('localCart');

      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId===item.id.toString());

        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((res)=>{
          let item = res.filter((item:product)=> item.productId?.toString() === productId?.toString());
          if(item.length){
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }

  handleQuantity(val:string){

    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val=='min'){
      this.productQuantity-=1;
    }

  }

  addTocart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity; 
      if(!localStorage.getItem('user')){
        console.log(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        console.log("user is logined");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData : cart= {
          ...this.productData,
          userId,
          productId : this.productData.id
        }
        delete cartData.id
        // console.log(cartData);
        this.product.addTocart(cartData).subscribe((res)=>{
          if(res){
            // alert("Product is added to cart");
            this.product.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
      
    }
  }

  removeTocart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId);
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((res)=>{
        if(res){
          this.product.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }

}
