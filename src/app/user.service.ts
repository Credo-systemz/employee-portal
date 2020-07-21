import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";
  constructor(public http:HttpClient) { }
  
  allCountries(): Observable<any>{
    return this.http.get(this.url);
  }
  
  UserRegistraion(UserData:any){
    return this.http.post("http://localhost:3000/register",UserData);
  }

  confirmEmail(data:any){
    return this.http.put("http://localhost:3000/confirmEmail",data);
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
  userinfo(userinfo){
    return this.http.post("http://localhost:3000/userinfo",userinfo);
  }

  emailCheck(emailid){
    return this.http.get("http://localhost:3000/emailCheck/"+emailid);
  }

}