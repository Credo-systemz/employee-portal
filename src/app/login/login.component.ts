import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
    constructor(private  dialog:  MatDialog, private  router:  Router) { }
    
  ngOnInit(): void {
  }
}
