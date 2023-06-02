import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product, order } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  cartData = new EventEmitter<product[]|[]>(); 

  constructor(private http: HttpClient) { }

  addProduct(data:product){
    return this.http.post("http://localhost:3000/products",data)
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(productData:product){
    return this.http.put<product>(`http://localhost:3000/products/${productData.id}`,productData);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3'); 
  }

  trendyProducts(){
      return this.http.get<product[]>('http://localhost:3000/products?_limit=6'); 
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  addTocart(cartData: cart){
    return this.http.post("http://localhost:3000/cart",cartData);
  }
  
  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product)=>productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  getCartList(userId:number){
    return this.http.get<product[]>("http://localhost:3000/cart?userId="+userId,{
      observe: 'response'
    }).subscribe((res)=>{
      if(res && res.body){
        this.cartData.emit(res.body);
      }
      
    });
  }

  removeToCart(cartId: number){
    return this.http.delete("http://localhost:3000/cart/"+cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number){
    return this.http.delete('http://localhost:3000/cart/'+cartId).subscribe((result) => {
      this.cartData.emit([]);
    });
  } 
  
  orderNow(data: order){
    return this.http.post('http://localhost:3000/order/', data);
  }

  cancelOrder(orderId: number){
    return this.http.delete('http://localhost:3000/order/'+orderId);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/order?userId=' + userData.id);
  }

  deleteOrder(orderId:number){
    return this.http.delete('http://localhost:3000/order/'+orderId);
  }
}
