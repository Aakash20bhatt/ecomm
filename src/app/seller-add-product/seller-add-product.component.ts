import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage : string|undefined;

  constructor(private product: ProductsService) { }

  ngOnInit(): void {
  }

  submit(val:product){
    this.product.addProduct(val).subscribe((res)=>{
      // console.log(res);
      if(res){
        this.addProductMessage = "Product is successfully added";
      }

      setTimeout(()=>this.addProductMessage=undefined, 3000);
    });
  }



}
