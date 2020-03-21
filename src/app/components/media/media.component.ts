import { Component, OnInit } from '@angular/core';
//for materialize CSS inits
declare var $: any;


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //init materialbox
    $(document).ready(function () {
      $('.materialboxed').materialbox();
    });

  }

}
