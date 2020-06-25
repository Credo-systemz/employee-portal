import { Component, OnInit,AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

 
   countries=["India","USA","Europe","Singapore"]

   UserProfile:FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.UserProfile=new FormGroup ({
      'FName':new FormControl(null, Validators.required),
      'Email':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)]),
      'Password':new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'Mobile':new FormControl(null,[Validators.required,Validators.pattern('/{0-9}[0-9]/')]),
      'UidType':new FormControl(null, Validators.required),
      'Uid':new FormControl(null, Validators.required),
    })
  }
get fnamectrl(){
  return this.UserProfile.get('Fname')
} get Emailctrl(){
  return this.UserProfile.get('Email')
}  get Passwordctrl(){
  return this.UserProfile.get('Password')
}  get Mobilectrl(){
  return this.UserProfile.get('Mobile')
}
Uprofile(){
  
}

}
