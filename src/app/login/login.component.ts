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

      this.loginForm=new FormGroup({

        'EmailId':new FormControl(null,Validators.required),
        'Password': new FormControl(null,Validators.required)
      });  
  
  }

  doLogin(){

  this.loginUser.userLogin(this.loginForm.value).subscribe((data:string)=>{

    console.log(data);
    // this.msgLog=data;
    if(data.length==0){

      this.logMessage="Invalid User";
    }
    else {

      localStorage.setItem("token",data);
    }
   }, (error:any)=>{

     console.log(error);
     this.logMessage = "Something went wrong!!";
   })
  
 }
 };
 