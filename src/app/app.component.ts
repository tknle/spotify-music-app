

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Event, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  searchString: string = '';
  title = 'spotify-api';
  public token: any;
  
  handleSearch() {
    if (this.searchString != null) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchString },
      });
    }
    this.searchString = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() : void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }
}
