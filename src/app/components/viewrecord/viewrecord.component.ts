import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewrecord',
  templateUrl: './viewrecord.component.html',
  styleUrls: ['./viewrecord.component.css']
})
export class ViewrecordComponent implements OnInit {
  panelOpenState = false;
  UserInfo;
  constructor(public UserSer:UserService) { }

  ngOnInit(){
    this.UserSer.viewdata.subscribe((data)=>{
      this.UserInfo=data;
      console.log(data)
    });
  }

}
