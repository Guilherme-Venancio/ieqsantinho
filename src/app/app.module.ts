import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalPhotoCompetitorComponent } from './components/modal-photo-competitor/modal-photo-competitor.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalFavoritesVersesComponent } from './components/modal-favorites-verses/modal-favorites-verses.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ModalPhotoCompetitorComponent, ModalFavoritesVersesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ImageCropperModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
