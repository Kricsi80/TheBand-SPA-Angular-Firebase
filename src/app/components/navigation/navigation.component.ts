import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // toggle mobile menu
  toggleMenu(): void {
    document.getElementById('mobile-nav').classList.toggle('hidden');
  }
}
