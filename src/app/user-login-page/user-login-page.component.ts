import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validator, Validators, ValidatorFn} from'@angular/forms'

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {

  signUpUser:FormGroup;

  constructor() { }

  ngOnInit() {
   // const emailrexp = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.signUpUser = new FormGroup({
     'FirstName' : new FormControl(null,Validators.required),
     'LastName': new FormControl(null),
     'Password':new FormControl(null,Validators.required),
     'ConfirmfPassword':new FormControl(null,Validators.required),
     'EmailId': new FormControl(null,Validators.required),
     'Company': new FormControl(null,Validators.maxLength(30)),
    'PhoneNum' :new FormControl(null,Validators.maxLength(10))
  });
  }
  SignUp(){
   console.log(this.signUpUser.value)
  }}
