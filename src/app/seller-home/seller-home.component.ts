import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
 
  productList : undefined | product[];
  poductMessage: undefined | string;
  trashIcon = faTrash;
  editIcon = faEdit

  constructor( private product : ProductsService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){

    this.product.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.poductMessage = "Product is deleted";
        this.list();
      }
    })

    setTimeout(()=>{
      this.poductMessage = undefined;
    },3000)
  }

  list(){
    this.product.productList().subscribe((res)=>{
      this.productList = res;
    })
  }

}
