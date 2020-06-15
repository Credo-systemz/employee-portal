import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logMessage:string="";

  loginForm:FormGroup;


  constructor(public loginUser :UserService) { }

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

    console.log(data);
    if(data==null){
      this.logMessage="Invalid User";
    }
    else { 
      this.logMessage="Success"
      localStorage.setItem("token",data);
    }
   }, (error:any)=>{

     console.log(error);
     this.logMessage = "Something went wrong!!";
   })
  
 }
 };
 