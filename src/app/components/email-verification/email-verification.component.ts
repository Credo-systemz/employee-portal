import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  data = {_id:""};
  
  constructor(public UserSer :UserService, public ActRoute:ActivatedRoute, public myrouter:Router) {
    
    
   }

  ngOnInit(): void {
    
    this.ActRoute.params.subscribe((param:Params)=>{
      this.data._id=param.Userid  
        })
console.log(this.data);

    this.UserSer.confirmEmail(this.data).subscribe((data)=>{
      $("#exampleModal1").modal('show');
      
    }, (error)=>{
      $("#exampleModalCenter1").modal('show');
      
    });
  }

window(){
  window.close();
}

  close1(){
    $("#exampleModal").modal('hide');
    $("#pwdModal").modal('hide');
    this.myrouter.navigateByUrl('')
  }

}
