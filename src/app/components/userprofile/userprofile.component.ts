import { Component, OnInit} from '@angular/core';
import { FormGroup,Validators, FormBuilder, FormArray} from '@angular/forms';

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {

  panelOpenState = false;
  
  countries=["India","USA","Europe","Singapore"]
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  UserProfile:FormGroup;
  myval;
  constructor(public UserService: UserService,public fb:FormBuilder) { }

  ngOnInit() {
    this.getCountries();
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.UserProfile= this.fb.group ({
      'CandidateId':['',Validators.required],
      'JobTitle':['',Validators.required],
      'FName':['',Validators.required],
      'MName':['',Validators.required],
      'LName':['',Validators.required],
      'Email':['',[Validators.required,Validators.pattern(EmailPattern)]],
      'Password':['',[Validators.required,Validators.minLength(8)]],
      'DOB':['',Validators.required],
      'Mobile':['',Validators.required],
      'AlternateContact':['',Validators.required],
      'IdType':['',Validators.required],
      'IdNumber':['',Validators.required],
      'Country':['',Validators.required],
      'State':['',Validators.required],
      'City':['',Validators.required],
      'StreetName':['',Validators.required],
      'WhatsAppCheck':['',Validators.required],
      "addEduation":this.fb.array([
        this.addEducationFormGroup()
      ]),
      "addEmployment":this.fb.array([
        this.addEmploymentFormGroup()
      ])

    });
  
 }
//Dynamic form of Education

addEducationFormGroup():FormGroup{
  return this.fb.group({
    "EducationalType":[null,Validators.required],
    "CompletedYear":[null,Validators.required],
    "Percentile":[null,Validators.required],
    "Institution":[null,Validators.required]
  })
}

 addEducationButtonClick():void {
  (<FormArray>this.UserProfile.get("addEduation")).push(this.addEducationFormGroup());
}

 removeEducationButtonClick(formGroupIndex:number){
  const group= this.UserProfile.get('addEduation')['controls'] 
  group.splice(formGroupIndex,1);
}

//Dynamic form of Employment

addEmploymentFormGroup():FormGroup{
  return this.fb.group({
    "Organization":[null,Validators.required],
    "Fromdate":[null,Validators.required],
    "Todate":[null,Validators.required],
    "Designation":[null,Validators.required],
    "CTC":[null,Validators.required],
    "Experience":[null,Validators.required],
    "InterestedinJobOpp":[null,Validators.required],
    "TrainingRequired":[null,Validators.required]
  })
}

addEmploymentButtonClick():void {
 const group= (<FormArray>this.UserProfile.get("addEmployment"));
 group.push(this.addEmploymentFormGroup());
}
removeEmploymentButtonClick(formGroupIndex:number){
    const group= this.UserProfile.get('addEmployment')['controls']
    group.splice(formGroupIndex,1);
 }

  get fnamectrl(){
  return this.UserProfile.get('Fname')
} get Emailctrl(){
  return this.UserProfile.get('Email')
}  get Passwordctrl(){
  return this.UserProfile.get('Password')
}  get Mobilectrl(){
  return this.UserProfile.get('Mobile')
} get Countryctrl(){
  return this.UserProfile.get('Country')
} get Statectrl(){
  return this.UserProfile.get('State')
} get Cityctrl(){
  return this.UserProfile.get('City')
} get educationGroupLength(){
  return (<FormArray>this.UserProfile.get('addEduation')).length;
} get employmentGroupLength(){
  return (<FormArray>this.UserProfile.get('addEmployment')).length;
}

onChangeCountry(countryValue:any) {
  this.stateInfo=this.countryInfo[countryValue].States;
  this.cityInfo=this.stateInfo[0].Cities;
 // console.log(this.cityInfo);
  //console.log(countryValue)
}

 onChangeState(stateValue) {
   this.cityInfo=this.stateInfo[stateValue].Cities;
 // console.log(this.cityInfo);
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
console.log(this.UserProfile.value)
  // this.UserService.userinfo(this.UserProfile.value).subscribe((data:any)=>{
    
  //   this.UserProfile.reset();
  //   console.log(data);
  // },(error:any)=>{
  //   console.log(error);
  // });
}

}
