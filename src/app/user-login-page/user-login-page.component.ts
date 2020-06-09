import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,NgForm} from '@angular/forms';
import { UserService } from '../user.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

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
      'Password':new FormControl(null,[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")]),
      'ConfirmfPassword':new FormControl('',[Validators.required,this.CheckPassWord]),
      'EmailId': new FormControl(null,[Validators.required,Validators.email]),
      'Company': new FormControl(null,Validators.maxLength(30)),
     'PhoneNum' :new FormControl(null,[Validators.maxLength(10),Validators.minLength(10)])
   });
   
   }
   CheckPassWord(signUpUser:FormGroup){
    let Password=signUpUser.get('Password').value;
    let CheckPassWord=signUpUser.get('ConfirmPassword').value;
    return Password===CheckPassWord ? null : {NotSame:true}
  }

   SignUp(){
     console.log(this.signUpUser.value);
    this.UserService.UserRegistraion(this.signUpUser.value).subscribe((data:any)=>{
      console.log(data);

    },(error:any)=>{
      console.log(error);
    });
  }
   }
  

