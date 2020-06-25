import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

 
   countries=["India","USA","Europe","Singapore"]

   UserProfile:FormGroup;
  
   filteredOptions: Observable<string[]>;
  
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
      'Country':new FormControl(null)
    });
        this.filteredOptions = this.UserProfile.get('Country').valueChanges
      .pipe(
        startWith(''),
       map(value => this._filter(value))
     );
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

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.countries.filter(option => option.toLowerCase().includes(filterValue));
}
Uprofile(){
  
}



}
