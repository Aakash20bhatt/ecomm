import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart , priceSummary} from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData : cart[] | undefined; 
  priceSummary : priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductsService, private router : Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((res)=>{
      this.loadDetails();
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((res)=>{
      this.cartData = res;
      let price = 0;

      res.forEach((item) => {
        if(item.quantity){
          price += (+item.price * +item.quantity);
        }
        
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = 100;

      this.priceSummary.total = this.priceSummary.price+this.priceSummary.tax+this.priceSummary.delivery-this.priceSummary.discount;
      
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    })
  }

}

