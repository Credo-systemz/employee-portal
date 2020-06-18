import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorup=false;

  logMessage:string="";

  loginForm:FormGroup;

  hide = true;

  constructor(public loginUser :UserService,public myRoute:Router) { }

    ngOnInit() {
      let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
      this.loginForm=new FormGroup({

        'EmailId':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)]),
        'Password': new FormControl(null,[Validators.required, Validators.minLength(8)])
      });  
  
  }
    get  EmailIdCtrl(){
      return this.loginForm.get('EmailId')
    }
    get  PasswordCtrl(){
      return this.loginForm.get('Password')
    }
    
  doLogin(){

  this.loginUser.userLogin(this.loginForm.value).subscribe((data:any)=>{
    
    if(data==null){
      this.logMessage="Invalid User";
      this.errorup=true
    }
    else { 
      this.logMessage="Success"
      localStorage.setItem("token",data);
      this.loginForm.reset()
      this.myRoute.navigateByUrl("/home")
    }
   }, (error:any)=>{
     console.log(error);
     if(error.status==404){
      this.errorup=true
      this.logMessage="User Name Not Found"
      this.loginForm.reset()
    }else if(error.status==401){
      this.logMessage="User ID or Password Incorrect";
      this.errorup=true
      this.loginForm.reset()
    }
     
   })
  
 }
 };
 