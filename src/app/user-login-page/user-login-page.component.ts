import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {
  
  errorMsg:string;
  signUpUser:FormGroup;

  constructor(public UserService: UserService) { }
  
  
  ngOnInit(): void {
    let PasswordPattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])$'
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.signUpUser = new FormGroup({
      'FirstName' : new FormControl(null,Validators.required),
      'LastName': new FormControl(null,Validators.required),
      'Password':new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'ConfirmPassword':new FormControl(null,Validators.required),
      'EmailId': new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)]),
      'Company': new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(30)]),
     'MobileNo' :new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(11)])
    });
    
   }
  
get FnameCtrl(){
  return this.signUpUser.get('FirstName')
}  
get LnameCtrl(){
  return this.signUpUser.get('LastName')
}
get PasswordCtrl(){
  return this.signUpUser.get('Password')
}
get emailCtrl(){
  return this.signUpUser.get('EmailId')
}
get MobileNoCtrl(){
  return this.signUpUser.get('MobileNo')
} 
get CompanyCtrl(){
  return this.signUpUser.get('Company')
}

//Check for Email ID is already taken or not
checkemail(Email:string){
  if(Email.length==0 ||Email==null){
null
  }else
  this.UserService.userEmailCheck(Email).subscribe((data:any)=>{
    console.log(data)
  },(error:any)=>{
    //console.log(error);
    this.errorMsg="EmailId is already taken";
  }); 
}
//Registration
   SignUp(){
     //console.log(this.signUpUser.value)
     delete this.signUpUser.value.ConfirmPassword;
     console.log(this.signUpUser.value);
    this.UserService.UserRegistraion(this.signUpUser.value).subscribe((data:any)=>{
      console.log(data);
    },(error:any)=>{
      console.log(error);
    });
 this.signUpUser.reset()
 }
  
   }
  