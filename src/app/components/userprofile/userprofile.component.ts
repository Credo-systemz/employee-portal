import { Component, OnInit,AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  UserProfile:FormGroup;
  country;
   countries=["India","USA","Europe","Singapore"]
  
  constructor() { }

  ngOnInit(): void {
    this.UserProfile= new FormGroup({
      'Country':new FormControl(null, [Validators.required])
    });
    
  }  
}
