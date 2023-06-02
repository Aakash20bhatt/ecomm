import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData : undefined | product;
  productMessage: undefined | string;

  constructor(private route : ActivatedRoute, private product: ProductsService, private routes: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId  && this.product.getProduct(productId).subscribe((data)=>{
      // console.log(data);
      this.productData = data;
    })
  }

  submit(data:product){
    if(this.productData ){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((res)=>{
      if(res){
        this.productMessage = "Product has updated";
      }
    });

    setTimeout(()=>{
      this.productMessage=undefined;
      this.routes.navigate(['/seller-home']);
    },3000);
    
  }

}
