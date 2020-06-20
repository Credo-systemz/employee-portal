import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/user.service';
declare var $;
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  
  hide = true;
  _id;

  constructor(public ActRoute:ActivatedRoute, public UserSer:UserService){ }

  ResetPassForm:FormGroup;
  mydata;
  ngOnInit(): void {
  
    this.ResetPassForm=new FormGroup({
  
      'Password':new FormControl(null,[Validators.required,Validators.minLength(8)]),
  
      'ConfirmPassword':new FormControl(null)
  
    }); 

      this.ActRoute.params.subscribe((param:Params)=>{
      this._id=param.Userid  
        })
  }
  get PasswordCtrl(){
    return this.ResetPassForm.get("Password")
  }
  get ConfirmPasswordCtrl(){
    return this.ResetPassForm.get("ConfirmPassword")
  }
  resetpassword(){
    this.mydata=this.ResetPassForm.value;
    this.mydata._id=this._id
    delete this.mydata.ConfirmPassword;
    this.ResetPassForm.reset()
    this.UserSer.resetpassword(this.mydata).subscribe((data:any)=>{
     console.log(data)
     $("#exampleModal").modal("show");

    })

  }
}
