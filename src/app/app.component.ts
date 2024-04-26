import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoginPage: boolean;

  constructor(
    private platform: Platform,
    private router: Router,
  ) {
    initializeApp(environment.firebaseConfig);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = (event.url === '/login');
      }
    });
  }
}
