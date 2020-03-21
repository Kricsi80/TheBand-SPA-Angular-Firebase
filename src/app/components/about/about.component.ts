import { Component, OnInit } from '@angular/core';
//for materialize CSS inits
declare var $: any;


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      //init slider
      $('.slider').slider({
        indicators: false,
        height: 300,
        transition: 500,
        interval: 6000
      });
      //init materialbox
      $('.materialboxed').materialbox();
      //init modal
      $('.modal').modal();
    });

  }

}