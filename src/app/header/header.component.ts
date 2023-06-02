import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../datatype';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellername : string = '';
  username : string=''; 
  searchResult : undefined | product[];
  cartItems = 0;
  constructor(private route : Router, private product: ProductsService) { }

  ngOnInit(): void {
    
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerdata = sellerStore && JSON.parse(sellerStore)[0];
          this.sellername = sellerdata.name; 
        }else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.username = userData.name;
          this.product.getCartList(userData.id);
        }
        else{
          this.menuType = 'default';
        }
      }
    })

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((res)=>{
        if(res.length>4)
        {
          res.length=4;
        }
        
        this.searchResult = res;
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  submitSearch(val:string){
      this.route.navigate([`search/${val}`]);
  }

  redirectToDetail(id:number){
    this.route.navigate(['/details/'+id]);
  }

}
