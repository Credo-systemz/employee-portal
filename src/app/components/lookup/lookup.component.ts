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
  results:any;
  searchField:string;
  searchValue:any;
  


  displayedColumns: any[] = ['No', 'Name', 'Skills', 'Experience','CurrentCompany',"Mobile",'Location','MoreDetails'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dataSource:userData[]=[
  // {No:1,Name:"Archana",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:2,Name:"Ravi",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:3,Name:"Banu",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""},
  // {No:4,Name:"Rithvik",Skills:"Javascript",Experience:"1Year",CurrentCompany:"ABC",
  // Mobile:"900434343",Location:"Chennai",'MoreDetails':""}]
  

mdata;
  constructor(public UserService: UserService) {}
   
  ngOnInit(){
    this.UserService.getData().subscribe((data)=>{
      this.mdata=data
      console.log(data);
    });
  }

  setValue(drp:any){
    this.choose=drp.target.value;
    console.log(this.choose);
  }

  search(text:any){
    if(this.choose==='skills'){
   for( let i=0;i<this.mdata.length;i++)
   {
      for(let j=0;j<this.mdata[i].addEmployment.length;j++)
      {
         if(text.includes(this.mdata[i].addEmployment[j].Skills))
         {
         this.results.push(this.mdata[i])  
         }
      }
    }
   } else if(this.choose==='experience'){
    for( let i=0;i<this.mdata.length;i++)
    {
       for(let j=0;j<this.mdata[i].addEmployment.length;j++)
       {
          if(text.includes(this.mdata[i].addEmployment[j].Experience))
          {
          this.results.push(this.mdata[i])  
          }
       }
     }
    }
     else if(this.choose==='name'){

      for( let i=0;i<this.mdata.length;i++)
       {
         if(text.includes(this.mdata[i].FName)||text.includes(this.mdata[i].LName))
         {
          this.results.push(this.mdata[i])  
         }
       }
     }
  else if(this.choose==='id'){
    for( let i=0;i<this.mdata.length;i++)
    {
      if(text.includes(this.mdata[i].IdNumber))
      {
       this.results.push(this.mdata[i])  
  
       }
     }
  }else if(this.choose==='mobile'){
    for( let i=0;i<this.mdata.length;i++)
    {
      if(text.includes(this.mdata[i].Mobile))
      {
       this.results.push(this.mdata[i])  
      }
    }
  }
 }
 // 
//   for (var i=0 ; i < Object.keys(data).length ; i++) 
//   {
// if(this.choose=="name"){
//   if(data[i].FName.toLowerCase()==this.searchValue.toLowerCase()) {
//          this.results.push(data[i]);
//         }else if(data[i].MName.toLowerCase()==this.searchValue.toLowerCase()) {
//           this.results.push(data[i]);
//          }else if(data[i].LName.toLowerCase()==this.searchValue.toLowerCase()) {
//           this.results.push(data[i]);
//          }
// }


  //  for(var key in data[i]){  
  //    if(data[i][this.choose].toString().toLowerCase()==this.searchValue.toLowerCase()) {
  //      this.results.push(data[i]);
  //    }
  // }
 
// }

// this.dataSource=this.results;
// console.log(this.searchValue);

// }, (error)=>{
//  console.log(error);
 
// })

//  }


}
