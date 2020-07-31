import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any,choose:any,myinput:string):any[] {
    
    if(myinput.length==0|| myinput==undefined || myinput==null || choose==""){
      return value;
       }
       else if(choose==='skills'){
       
       for( let i=0;i<value.length;i++)
       {
          for(let j=0;j<value[i].addEmployment.length;j++)
          {
             if(myinput.includes(value[i].addEmployment[j].Skills))
             {
               return [value[i]]

             } else if(myinput.includes!(value[i].addEmployment[j].Skills)){
              
              return value;
             }
          }
        }
       } else if(choose==='experience'){
        for( let i=0;i<value.length;i++)
        {
           for(let j=0;j<value[i].addEmployment.length;j++)
           {
              if(myinput.includes(value[i].addEmployment[j].Experience))
              {
              return [value[i]] 

              }else if(myinput.includes!(value[i].addEmployment[j].Experience)){

                return value
              }
           }
         }
        }
         else if(choose==='name'){
    
          for( let i=0;i<value.length;i++)
           {
             if(myinput.includes(value[i].FName))
             {
              return [value[i]]
             }else if(myinput.includes(value[i].LName)){
              return [value[i]] 
             }else if(myinput.includes!(value[i].FName)){
              return value
             }else if(myinput.includes!(value[i].LName)){
              return value
             }
           }
         }
      else if(choose==='id'){
        for( let i=0;i<value.length;i++)
        {
          if(myinput.includes(value[i].IdNumber))
          {
            return [value[i]]
           }else if(myinput.includes!(value[i].IdNumber)){
             return value
           }
         }
      }else if(choose==='mobile'){
         
        for( let i=0;i<value.length;i++)
         {
          if(myinput.includes(value[i].Mobile))
          {
           return [value[i]]
          }else if(myinput.includes!(value[i].Mobile)){
            return value
          }
        }
      }
  }
}
