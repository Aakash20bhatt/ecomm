import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../datatype';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  invalidUserAuth = new EventEmitter<boolean>(false);
  userSignUp(user: Signup){
    this.http.post("http://localhost:3000/users", user, {observe: 'response' as 'body'}).
    subscribe((res:any)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body))
        this.router.navigate(['/'])
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }

  userLogin(data: Login){
    this.http.get<Signup[]>(`http://localhost:3000/users/?email=${data.email}&password=${data.password}`, {observe: 'response' as 'body'}).
    subscribe((res:any)=>{
      if(res && res.body.length){
        localStorage.setItem('user',JSON.stringify(res.body[0]))
        this.invalidUserAuth.emit(false);
        this.router.navigate(['/'])
      }else{
        this.invalidUserAuth.emit(true);
      }
      
    })
  }
}
