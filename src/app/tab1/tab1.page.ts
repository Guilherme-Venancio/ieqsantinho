import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  swiper: Swiper
  latestUpdates = [
                    '../../assets/pragacoes/Maranata!-Ora-vem-Senhor-Jesus.png',
                    '../../assets/pragacoes/Muitos-se-ofendem-facilmente.png',
                    '../../assets/pragacoes/Quero-discernir-a-minha-história!.png',
                    '../../assets/pragacoes/THUMB-O-PODER-DA-PALAVRA.jpg',
                    '../../assets/pragacoes/Uma-Nova-Estação-de-vida-para-você.png'
                  ]
  banners = ['../../assets/banners/cultorosa.png',
            '../../assets/banners/E-TEMPO-TELAO.png',
            '../../assets/banners/PROJETO-DE-VIDA.png'
          ]

  constructor() {}

  ionViewDidEnter() {
    this.swiper = this.swiper ?? new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 2.5,
      spaceBetween: 10,
    });
  }

}
