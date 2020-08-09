import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})



export class FilterPipe implements PipeTransform {


  transform(value: any, choose: any, myinput: string): any[] {


    var temp = [];
    var result = [];
    if (myinput.length == 0 || myinput == undefined || myinput == null || choose == "") {
      return value;
    }
    else if (choose === 'skills') {
      for (let key of value) {
        for (let key1 of key.addEmployment) {
          if (key1.Skills.toLowerCase().includes(myinput.toLowerCase())) {
            temp.push(key);
            for (var value of temp) {
              if (result.indexOf(value) === -1) {
                result.push(value);
              }
            }
          }
        }
      }
      return result;
    } else if (choose === 'experience') {

      for (let key of value) {
        for (let key1 of key.addEmployment) {
          if (key1.Experience.toLowerCase().includes(myinput.toLowerCase())) {
            temp.push(key);
            for (var value of temp) {
              if (result.indexOf(value) === -1) {
                result.push(value);
              }
            }
          }
        }
      }
      return result;
    }
    else if (choose === 'name') {
      for (let key of value) {
        var fullName = key.FName + ' ' + key.MName + ' ' + key.LName;
        if (fullName.toLowerCase().includes(myinput.toLowerCase())) {
          temp.push(key);
          for (var value of temp) {
            if (result.indexOf(value) === -1) {
              result.push(value);
            }
          }
        }
      }
      return result;
    }
    else if (choose === 'id') {
      for (let key of value) {
        if (key.IdNumber.toLowerCase().includes(myinput.toLowerCase())) {
          temp.push(key);
        }
      }
      return temp;
    }
    else {
      for (let key of value) {
        if (key.Mobile.includes(myinput)) {
          temp.push(key);
        }
      }
      return temp;
    }
  }
}
