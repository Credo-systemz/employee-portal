import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  panelOpenState = false;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
   UserProfile:FormGroup;
  
   filteredOptions: Observable<string[]>;
  
  constructor(public UserService: UserService) { }

  ngOnInit(): void {
    this.getCountries();
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.UserProfile= new FormGroup ({
      'FName':new FormControl(null, Validators.required),
      'Email':new FormControl(null,[Validators.required,Validators.pattern(EmailPattern)]),
      'Password':new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'Mobile':new FormControl(null,[Validators.required,Validators.pattern('/{0-9}[0-9]/')]),
      'UidType':new FormControl(null, Validators.required),
      'Uid':new FormControl(null, Validators.required),
      'Country':new FormControl(null)
    });
    //     this.filteredOptions = this.UserProfile.get('Country').valueChanges
    //   .pipe(
    //     startWith(''),
    //    map(value => this._filter(value))
    //  );
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

onChangeCountry(countryValue:any) {
  this.stateInfo=this.countryInfo[countryValue].States;
  this.cityInfo=this.stateInfo[0].Cities;
  console.log(this.cityInfo);
}

onChangeState(stateValue) {
  this.cityInfo=this.stateInfo[stateValue].Cities;
  console.log(this.cityInfo);
}
getCountries(){
  this.UserService.allCountries().subscribe((data:any)=>{
    this.countryInfo=data.Countries;
  },
  (error:any)=>{
    console.log(error);
  });
}
userform(){
  this.UserService.userinfo(this.UserProfile.value).subscribe((data:any)=>{
    this.UserProfile.reset();
    console.log(data);
  },(error:any)=>{
    console.log(error);
  });
}

}
