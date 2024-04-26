import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerService } from '../services/banner/banner.service';
import { Banner } from '../models/Banner';
import Swiper from 'swiper';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  @ViewChild('swiperGallery') swiperGallery!: ElementRef;
  swiper: Swiper
  banners: Banner[] = [new Banner()]
  photoToView: boolean = false

  constructor(private bannerService: BannerService, private storageService: StorageService) {
    this.bannerService.getBanner()
    this.bannerService.getBannerEvent().subscribe((banners :any) => {
      if(banners) this.banners = banners
    })
  }

  async openPhotoGallery() {
    try {
      let permission = await Camera.requestPermissions()
        permission = await Camera.checkPermissions()
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        promptLabelHeader: "Selecione a foto",
        promptLabelPhoto: "Foto do dispositivo",
        promptLabelPicture: "Abrir câmera",
        promptLabelCancel: "Cancelar",
        presentationStyle: "popover",
      });
      // this.loadingService.present();
      const croppedImage = `data:image/webp;base64,${image.base64String}`;
      // return
      const blob = this.base64ToBlob(croppedImage.replace('data:image/webp;base64,', ''), 'image/webp');
      const url = await this.storageService.uploadBlob(blob, `banners/${Date.now()}`)
      this.bannerService.createdUser({url: url, date: `${Date.now()}`})
    } catch (error) {
      // this.toastService.error('Erro ao buscar a imagem')
      window.alert(error);
    }
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
}
