import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Signup, Login } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'body'
  };

  public obj : any;


  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data:Signup){ 
    return this.http.post("http://localhost:3000/seller",data, {observe: 'response' as 'body'}).
    subscribe((res)=>{
      // console.log(res);
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
      localStorage.setItem('seller',JSON.stringify((<any>res).body))
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login){
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response' as 'body'}).
    subscribe((res:any)=>{
      console.log(res);
      if(res && res.body.length){
        console.log("user logged in");
        this.router.navigate(['seller-home']);
        localStorage.setItem('seller',JSON.stringify(res.body))
      }else{
        console.log("user login fail");
        this.isLoginError.emit(true);
      }
    });
  }
}
