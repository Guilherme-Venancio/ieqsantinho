import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Banner } from '../models/Banner';
import { BannerService } from '../services/banner/banner.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('slideInRight', [
      state('active', style({ transform: 'translateX(0)' })),
      state('inactive', style({ transform: 'translateX(0)' })),
      transition('active => inactive', [
        style({ transform: 'translateX(-100%)' }),
        animate('260ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)' }))
      ]),
      transition('inactive => active', [
        style({ transform: 'translateX(-100%)' }),
        animate('260ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)' }))
      ]),
    ])
  ]
})
export class Tab2Page {

  swiper: Swiper
  imgRender: string = null
  imgSelected: string = null
  dateSelected: string = null
  trigger = true
  banners: Banner[] = [new Banner()]
  highlightedDates = [
    {
      date: '2024-04-13',
      textColor: 'var(--ion-color-primary-contrast)',
      backgroundColor: 'var(--ion-color-primary)',
    },
    {
      date: '2024-04-14',
      textColor: 'var(--ion-color-primary-contrast)',
      backgroundColor: 'var(--ion-color-primary)',
    },
    {
      date: '2024-04-28',
      textColor: 'var(--ion-color-primary-contrast)',
      backgroundColor: 'var(--ion-color-primary)',
    },
  ];


  constructor(private bannerService: BannerService) {}

  ionViewDidEnter() {
    this.bannerService.getBanner()
    this.bannerService.getBannerEvent().subscribe((banners :any) => {
      if(banners){
        this.banners = banners
        this.banners.forEach(banner => {
          banner.date = this.formatarData(banner.date).toString()
          this. highlightedDates = [
            {
              date: banner.date,
              textColor: 'var(--ion-color-primary-contrast)',
              backgroundColor: 'var(--ion-color-primary)',
            },
            {
              date: banner.date,
              textColor: 'var(--ion-color-primary-contrast)',
              backgroundColor: 'var(--ion-color-primary)',
            },
            {
              date: banner.date,
              textColor: 'var(--ion-color-primary-contrast)',
              backgroundColor: 'var(--ion-color-primary)',
            },
          ];
        })
      }
    })
  }

  handlerSelectedImage() {
    this.trigger = !this.trigger
    const response = this.banners.filter(banner => {
      return banner.date.includes(this.dateSelected?.split('T')[0])
    })
    if(!response.length) return this.imgSelected = null
    return this.imgSelected = response[0].url
  }

  formatarData(timestamp: any = '0') {
    if(!timestamp && timestamp.length < 5) return ''
    const date = new Date(Number(timestamp));
    const dia = (date.getDate());
    const mes = ((date.getMonth() + 1));
    const ano = date.getFullYear();
    const horas = (date.getHours());
    const minutos = (date.getMinutes());
    const dataFormatada = `${ano}-0${mes}-${dia}`;
    return dataFormatada;
  }
}
