import { Component, OnInit} from '@angular/core';
import { FormGroup,Validators, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common'

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {

  panelOpenState = false;
  imageurl="assets/images/profilePic.png"
  countries=["India","USA","Europe","Singapore"]
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  UserProfile:FormGroup;
  myval;
  CountryValueNull:boolean=true;
  StateValueNull:boolean=true;
  CityValueNull:boolean=true;
  DateofBirth: string;
    MaxDate=new Date()

  constructor(public UserService: UserService,public fb:FormBuilder,public datepipe:DatePipe) { }

  ngOnInit() 
  {
    let EmailPattern='^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    let mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    let numeric = "/^[a-zA-Z0-9]+$/";/* for CTC,percentile */
    let VoterId = "^([a-zA-Z]){3}([0-9]){7}?$";
    let PanCard ="^[A-Z]{5}[0-9]{4}[A-Z]{1}$";
    let AdhaarCard ='^[0-9]{12}$';
    let Passport ='^[A-Z]{1}-[0-9]{7}$';
    let DrivingLicense='^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$';
    this.UserProfile= this.fb.group 
   ({
     // 'CandidateId':['',Validators.required],
      'JobTitle':[''],
      'FName':['',[Validators.required,Validators.maxLength(15)]],
      'MName':[''],
      'LName':['',[Validators.required,Validators.maxLength(15)]],
      'Email':['',[Validators.required,Validators.pattern(EmailPattern)]],
      'DOB':['',Validators.required],
      'Mobile':['',[Validators.required,Validators.pattern(mobNumberPattern)]],
      'WhatsAppCheck':[''],
      'AlternateContact':['',[Validators.pattern(mobNumberPattern)]],
      'IdType':['',Validators.required],
      'IdNumber':[''],
      'Address':['',Validators.required],
      'Country':['default',Validators.required],
      'State':['default',Validators.required],
      'City':['default',[Validators.required,Validators.maxLength(15)]],
      'StreetName':['',[Validators.required,Validators.maxLength(200)]],
      "addEduation":this.fb.array([
        this.addEducationFormGroup()
         ]),
      "addEmployment":this.fb.array([
        this.addEmploymentFormGroup()
         ])
    });
        this.UserProfile.get('IdType').valueChanges.subscribe(val=>{
         if(val==='1'){
         this.UserProfile.get('IdNumber').setValidators([Validators.required,Validators.pattern(Passport)])
         } 
         else if(val==='2'){
         this.UserProfile.get('IdNumber').setValidators([Validators.required,Validators.pattern(AdhaarCard)])
         }
         else if(val=='3')
         {
         this.UserProfile.get('IdNumber').setValidators([Validators.required,Validators.pattern(DrivingLicense)])
         }
         else if(val=='4')
         {
         this.UserProfile.get('IdNumber').setValidators([Validators.required,Validators.pattern(VoterId)])
         }
         else if(val=='5')
         {
         this.UserProfile.get('IdNumber').setValidators([Validators.required,Validators.pattern(PanCard)])
         }
        
        })
              
  }
//Dynamic form of Education
    
addEducationFormGroup():FormGroup{
  
  let ValidYear='^19([7-9][0-9])|20([0-2][0-9])$';
  return this.fb.group({
    "EducationalType":[null,Validators.required],
    "CompletedYear":[null,[Validators.required,Validators.pattern(ValidYear)]],
    "Percentile":[null,[Validators.required]],
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
    "Organization":[null,[Validators.required,Validators.maxLength(100)]],
    "Fromdate":[null,Validators.required],
    "Todate":[null,Validators.required],
    "Designation":[null,Validators.required],
    "Skills":[null,Validators.required],
    "CTC":[null,Validators.required],
    "Experience":[null,Validators.required],
    "InterestedinJobOpp":[null,Validators.required],
    "TrainingRequired":[null,Validators.required]
    
  })
}

get Candidatectrl(){
  return this.UserProfile.get("CadidateId")
}
 get Fnamectrl(){
  return this.UserProfile.get('FName')
} get Lnamectrl(){
  return this.UserProfile.get('LName')

} get Emailctrl(){
  return this.UserProfile.get('Email')
}   get Mobilectrl(){
  return this.UserProfile.get('Mobile')
}
get DOBctrl(){
  return this.UserProfile.get('DOB'); 
} 
get Idnumberctrl(){
  return this.UserProfile.get("IdNumber")
}
get Addressctrl(){
  return this.UserProfile.get("Address")
}
get Countryctrl(){
  return this.UserProfile.get('Country')
} get Statectrl(){
  return this.UserProfile.get('State')
} get Cityctrl(){
  return this.UserProfile.get('City')
} get Streetctrl(){
  return this.UserProfile.get('StreetName')
}
 get educationGroupLength(){
  return (<FormArray>this.UserProfile.get('addEduation')).length;
} get employmentGroupLength(){
  return (<FormArray>this.UserProfile.get('addEmployment')).length;
}
addEmploymentButtonClick():void {
  const group= (<FormArray>this.UserProfile.get("addEmployment"));
  group.push(this.addEmploymentFormGroup());
 }
 removeEmploymentButtonClick(formGroupIndex:number){
     const group= this.UserProfile.get('addEmployment')['controls']
     group.splice(formGroupIndex,1);
  }

getErrorMessage(){
  return "Please enter a Valid value";
}
getCountries(){
  this.UserService.allCountries().subscribe((data:any)=>{
  this.countryInfo=data.Countries;
  console.log(data)
},
(error:any)=>{
  console.log(error);
});
}
onChangeCountry(countryValue:any) {
  if(countryValue=="default"){
    this.CountryValueNull=true;
  }else{

    this.CountryValueNull=false;
    this.stateInfo=this.countryInfo[countryValue].States;
    this.cityInfo=this.stateInfo[0].Cities;
}
}
 onChangeState(stateValue) {
  if(stateValue=="default"){
    this.StateValueNull=true;

  }else{
    this.StateValueNull=false;
   this.cityInfo=this.stateInfo[stateValue].Cities;
 }
 }

 onChangeCity(cityValue){
   if(cityValue=="default"){
     this.CityValueNull=true;
   }else{
   this.CityValueNull=false;
   }
 }



imgSelection(event){
  if(event.target.files){
    let reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.imageurl=event.target.result;
    }
  }
}

userform(){
this.UserProfile.value.DOB=this.datepipe.transform(this.DOBctrl.value,'dd/MM/yyyy')
this.UserProfile.value.addEmployment[0].Fromdate=this.datepipe.transform(this.UserProfile.get('addEmployment')['controls']['0']['value']['Fromdate'],'dd/MM/yyyy')
this.UserProfile.value.addEmployment[0].Todate=this.datepipe.transform(this.UserProfile.get('addEmployment')['controls']['0']['value']['Todate'],'dd/MM/yyyy')
console.log(this.UserProfile.value)
console.log(this.UserProfile.status);

  // this.UserService.userinfo(this.UserProfile.value).subscribe((data:any)=>{

  //   this.UserProfile.reset();
  //   console.log(data);
  // },(error:any)=>{
  //   console.log(error);
  // });
}

}