import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Sort} from '@angular/material';
import { UserService } from 'src/app/user.service';
export interface userData {
   No: number;
   Name: string;
   Skills: string;
    Experience: string;
   CurrentCompany: string;
   Mobile:string,
   Location:string,
   MoreDetails:string,
}

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  
  searchBy:string="";
  choose:string;
  dataSource: any;

  displayedColumns: any[] = ['No', 'Name', 'Skills', 'Experience','CurrentCompany',"Mobile",'Location','MoreDetails'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dataSource:userData[]=[
  //   {No:1,Name:"Archana",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:2,Name:"Ravi",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:3,Name:"Banu",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:4,Name:"Rithvik",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""}]
  


  constructor(public UserService: UserService) {}
   
  ngOnInit(): void {
    this.getData();
  }

  setValue(drp:any){
    this.choose=drp.target.value;
    console.log(this.choose);
}

getData(){
  this.UserService.getData().subscribe((data)=>{
    console.log(data);
    this.dataSource=data;
  }, (error)=>{
    console.log(error);
    
  })
}

}
