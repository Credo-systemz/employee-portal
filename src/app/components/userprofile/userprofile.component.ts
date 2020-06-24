import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userdata:FormGroup
  // countries:string[]=["India","USA","Europe","Singapore"]
  
  constructor(public UserService: UserService) { }

  ngOnInit(): void {
  }

  saveInfo(){
    this.UserService.userinfo(this.userdata.value).subscribe((data:any)=>{
      this.userdata.reset();
      console.log(data);
    },
    (error:any)=>{
      console.log(error);
    })
  }

}
