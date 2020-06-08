import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,NgForm} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {

  signUpUser:FormGroup;
  constructor(public UserService: UserService) { }

  
  ngOnInit(): void {
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
    this.UserService.UserRegistraion(this.signUpUser.value)
    this.signUpUser.reset() 
   }
  
}
