import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {}
}
