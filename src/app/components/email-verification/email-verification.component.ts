import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

declare var $;
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  data:any;
  constructor(public UserSer :UserService) {
    if(localStorage.getItem('data')){
      this.data=JSON.parse(localStorage.getItem('data'));
    localStorage.clear();
    }
    
   }

  ngOnInit(): void {
    
    this.UserSer.registeration(this.data).subscribe((data)=>{
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
  }


  

}
