import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  popularProducts : undefined | product[];
  trendyProducts : undefined | product[];

  constructor(private product: ProductsService) { }

  ngOnInit(): void {

    this.product.popularProducts().subscribe((res)=>{
      this.popularProducts = res;
    });

    this.product.trendyProducts().subscribe((res)=>{
      this.trendyProducts =res;
    });
  }

}
