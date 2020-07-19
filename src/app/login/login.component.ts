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
  errorup1=false;
  errorup2=false;
  hide = true;
  logMessage:string="";


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
      this.myRoute.navigateByUrl("/userprofile")
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
     
   });
 }
 forgetpassword(){
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
  this.UserSer.emailCheck(this.emailCheckForm.value.NewEmail).subscribe((data1:any)=>{  
  //  if(data1){
  //   localStorage.setItem('token', data1);
    this.emailCheckForm.reset();  
    // $("#pwdModal1").modal('hide');
    // $("#exampleModal1").modal('show');
    // }
  },
  (error:any)=>{
    // $("#pwdModal1").modal('show');
    // this.errorup2=true;
    this.emailCheckForm.reset();   
  });

  $(document.body).removeClass("modal-open");
  $(".modal-backdrop").remove();
  
}

checkMailClose(){
  $("#pwdModal1").modal('hide');
}

 
}

 