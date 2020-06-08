import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
   
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".navbar-nav a").on("click", function()
    {
     $(".navbar-nav").find(".active").removeClass("active");
     $(this).parent().addClass("active");
   });
  }

}
