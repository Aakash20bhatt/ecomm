import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { order } from '../datatype';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData : order[]|undefined

  constructor(private product : ProductsService) { }

  ngOnInit(): void {

    this.getOrderList();



  }

  cancelOrder(orderId:number|undefined){

    orderId && this.product.cancelOrder(orderId).subscribe((res)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((res)=>{
      this.orderData = res;
    })
  }

}
