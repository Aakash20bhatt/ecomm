import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from '../datatype';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerService: SellerService, private router: Router) { }

  showLogin = false;
  authError:String = '';

  signUp(val: Signup):void{
    this.sellerService.userSignup(val);
  }

  LogIn(val: Login){
    this.sellerService.userLogin(val);
    this.sellerService.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or password is not correct";
      }
    })
  }

  openLogin(){
    this.showLogin=true;
  }

  openSignup(){
    this.showLogin=false;
  }

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

}
