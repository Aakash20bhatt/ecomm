import { Component, OnInit } from '@angular/core';
import { Login, Signup, product, cart } from '../datatype';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = true;
  authError: string='';

  constructor(private user: UserService, private product : ProductsService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signup(data:Signup){
    this.user.userSignUp(data);
    this.localCartToRemoteCart();
  }

  login(data:Login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res)=>{
      if(res){
        this.authError = "Please Enter Valid User Details";
      }else{
        this.localCartToRemoteCart();
      }
    })
  }

  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    // console.log(this.showLogin);
    this.showLogin=false;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);


      cartDataList.forEach((product:product, index)=>{
        let cartData : cart = {
          ...product,
          productId : product.id,
          userId
        };

        delete cartData.id;

        setTimeout(()=>{
          this.product.addTocart(cartData).subscribe((res)=>{
            if(res){
              // console.log("item stored in db");
            }
          })

          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        },500)

      })

    }

    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000)
    
  }

}

