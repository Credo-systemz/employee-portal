import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  UserRegistraion(UserData){
    console.log(UserData)
    return this.http.post("http://localhost:3000/register",UserData);
  }

  userLogin(loginData){
    console.log(loginData);
    return this.http.post("http://localhost:3000/login",loginData);

  }
}