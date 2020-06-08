import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  UserRegistraion(UserData){
  console.log(UserData)
  }
}
