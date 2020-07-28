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
  results:any[] = [];
  searchField:string;
  searchValue:any;
  


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

  }

  setValue(drp:any){
    this.choose=drp.target.value;
    console.log(this.choose);
    

  }

  search(text:any){
this.searchValue=text;
this.UserService.getData().subscribe((data)=>{
  console.log(data);
  
  
  for (var i=0 ; i < Object.keys(data).length ; i++)
  {
if(this.choose=="name"){
  if(data[i].FName.toLowerCase()==this.searchValue.toLowerCase()) {
         this.results.push(data[i]);
        }else if(data[i].MName.toLowerCase()==this.searchValue.toLowerCase()) {
          this.results.push(data[i]);
         }else if(data[i].LName.toLowerCase()==this.searchValue.toLowerCase()) {
          this.results.push(data[i]);
         }
}


  //  for(var key in data[i]){  
  //    if(data[i][this.choose].toString().toLowerCase()==this.searchValue.toLowerCase()) {
  //      this.results.push(data[i]);
  //    }
  // }
 
}

this.dataSource=this.results;
console.log(this.searchValue);

}, (error)=>{
 console.log(error);
 
})

  }


}
