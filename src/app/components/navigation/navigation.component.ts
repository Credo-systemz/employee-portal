import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
   
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
   
  }
}
