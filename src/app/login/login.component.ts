import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as base64 from 'base-64';
const jwt_decode = require('jwt-decode');

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorup=false;
  errorup1=false;
  errorup2=false;
  hide = true;
  spinner=false;
  submitted=false;
  logMessage:string="";
  token;
  loginForm:FormGroup;
  forgetForm:FormGroup
  emailCheckForm:FormGroup

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
      this.emailCheckForm=new FormGroup({
        'NewEmail':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)])
      })
      $(document.body).removeClass("modal-open");
      $(".modal-backdrop").remove();     
  
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
    get NewEmailCtrl(){
      return this.emailCheckForm.get('NewEmail')
    }
    checkemails(Email:string){

      this.UserSer.userEmailCheck(Email).subscribe((data:any)=>{
       if(data==true){
         this.submitted=false
         return this.submitted
       }
       alert("Please check your login email or Create new account first...");
       this.submitted=true;
      return this.submitted;
      
      })
      }
  doLogin(){
    this.spinner=true;
  this.UserSer.userLogin(base64.encode(this.loginForm.value.EmailId),base64.encode(this.loginForm.value.Password)).subscribe((data:any)=>{
    if(data==null){
      this.logMessage="Invalid User";
      this.errorup=true
    }
    else { 
      this.logMessage="Success"
      alert("Successfully login...");
      this.loginForm.reset();
      localStorage.setItem("token",data);
      this.token=jwt_decode(localStorage.getItem('token'));    
      if(this.token.Role==='Admin'){
        this.myRoute.navigateByUrl("/lookup")
      }else{
        if(this.token.isUpdate==false){
          console.log(this.token.isUpdate); 
          this.myRoute.navigateByUrl("/userprofile");
        }else{
          this.myRoute.navigateByUrl('/findjob')
        }
      }
    }

   },(error:any)=>{
     //console.log(error);
     if(error.status==404){
      this.errorup=true
      this.logMessage="User Name Not Found"
      this.loginForm.reset()
    }else if(error.status==401){
      this.logMessage="User ID or Password Incorrect";
      this.errorup=true
      this.loginForm.reset()
    }
    this.spinner=false;
   });
   
 }
 forgetpassword(){
  this.spinner=true;
   this.UserSer.forgetpasswords(this.forgetForm.value.ForgetEmail).subscribe((data1:any)=>{
     
    if(data1==true){
     $("#pwdModal").modal('hide');
     $("#exampleModal").modal('show');  
     this.forgetForm.reset();
     }
       },
   (error:any)=>{
     this.errorup1=true;
     this.forgetForm.reset();  
   });
   $(document.body).removeClass("modal-open");
   $(".modal-backdrop").remove();
   this.spinner=false;
 }

 close(){
   this.forgetForm.reset();
   $("#pwdModal").modal('hide');
   this.errorup1=false
   this.errorup2=false;
}
close1(){
  $("#exampleModal").modal('hide');
  $("#pwdModal").modal('hide');
}

  
checkemail(){
  this.spinner=true;
  this.UserSer.emailCheck(this.emailCheckForm.value.NewEmail).subscribe((data1:any)=>{  
  //  if(data1){
  //   localStorage.setItem('token', data1);
    this.emailCheckForm.reset();  
    // $("#pwdModal1").modal('hide');
    // $("#exampleModal1").modal('show');
    // }
    this.spinner=false;
  },
  (error:any)=>{
    // $("#pwdModal1").modal('show');
    // this.errorup2=true;
    this.emailCheckForm.reset();
    this.spinner=false;   
  });

  $(document.body).removeClass("modal-open");
  $(".modal-backdrop").remove();
  
}

checkMailClose(){
  $("#pwdModal1").modal('hide');
}

clean(){
  this.logMessage="";
  this.submitted=false;
}
 
}

 