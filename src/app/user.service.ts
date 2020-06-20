import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  UserRegistraion(UserData){
    
    return this.http.post("http://localhost:3000/register",UserData);
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");
  }
userEmailCheck(email){
  return this.http.get("http://localhost:3000/checkEmail/"+email);
}
  userLogin(loginData){
    return this.http.post("http://localhost:3000/login",loginData);
  }
  forgetpasswords(emailid){
    return this.http.get("http://localhost:3000/forgetuser/"+emailid);
  }
  resetpassword(resetdata){
    return this.http.put("http://localhost:3000/resetpassword",resetdata)
  }
}