import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorup=false;

  logMessage:string="";
  loginForm:FormGroup;
  forgetForm:FormGroup

  hide = true;

  constructor(public UserSer :UserService,public myRoute:Router) { }

    ngOnInit() {
      let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
      this.loginForm=new FormGroup({
        'EmailId':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)]),
        'Password': new FormControl(null,[Validators.required, Validators.minLength(8)])
      });  
      this.forgetForm=new FormGroup({
        'ForgetEmail':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)])
      })

  
  }
    get  EmailIdCtrl(){
      return this.loginForm.get('EmailId')
    }
    get  PasswordCtrl(){
      return this.loginForm.get('Password')
    }
    get ForgetEmailCtrl(){
      return this.forgetForm.get('ForgetEmail')
    }
    
  doLogin(){

  this.UserSer.userLogin(this.loginForm.value).subscribe((data:any)=>{
    
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
     
   });
 }
 forgetpassword(){
   this.UserSer.forgetpasswords(this.forgetForm.value.ForgetEmail).subscribe((data:any)=>{
     
     
  if(data==true){
    $("#pwdModal").modal('hide');
    $("#exampleModal").modal('show');
    this.forgetForm.reset();
  }else{
    this.logMessage="User Not found"
    this.forgetForm.reset();  
  }
   })
 }
 close()
 {this.forgetForm.reset()}
 }
 