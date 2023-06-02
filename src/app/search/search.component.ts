import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult : undefined | product[];

  constructor(private activateRoute: ActivatedRoute, private product : ProductsService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');

    query && this.product.searchProduct(query).subscribe((res)=>{
      this.searchResult = res;
    });
  }

}
