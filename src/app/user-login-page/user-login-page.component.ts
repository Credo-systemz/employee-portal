import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';

declare var jQuery: any;   
declare var $: any;
@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {
  
  submitted=false

  signUpUser:FormGroup;
  hide = true;

  constructor(public UserService: UserService) { }
  
  
  ngOnInit(): void {
    let PasswordPattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])$'
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,32})$';
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
checkemail(Email:string){

this.UserService.userEmailCheck(Email).subscribe((data:any)=>{
 if(data==true){
   this.submitted=true
   return this.submitted 
 }
 
return this.submitted=false
});
}
   SignUp(){
     //console.log(this.signUpUser.value)

     delete this.signUpUser.value.ConfirmPassword;

     console.log(this.signUpUser.value);

    this.UserService.UserRegistraion(this.signUpUser.value).subscribe((data:any)=>{

      jQuery(document).ready(function($){
        //open popup
        $('.cd-popup-trigger').on('click', function(event){
          event.preventDefault();
          $('.cd-popup').addClass('is-visible');
        });
        
        //close popup
        $('.cd-popup').on('click', function(event){
          if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
          }
        });
        //close popup when clicking the esc keyboard button
        $(document).keyup(function(event){
            if(event.which=='27'){
              $('.cd-popup').removeClass('is-visible');
            }
          });
      });
      console.log(data);
    },(error:any)=>{
      console.log(error);
    });
//  this.signUpUser.reset()
 }
  
   }
  