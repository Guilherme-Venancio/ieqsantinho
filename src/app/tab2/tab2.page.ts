import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('slideInRight', [
      state('active', style({ transform: 'translateX(0)' })),
      state('inactive', style({ transform: 'translateX(0)' })),
      // state('void', style({ transform: 'translateX(-100%)' })),
      // state('*', style({ transform: 'translateX(0)' })),
      // transition(':enter', animate('260ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('active => inactive', [
        style({ transform: 'translateX(-100%)' }),
        animate('260ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)' }))
      ]),
      transition('inactive => active', [
        style({ transform: 'translateX(-100%)' }),
        animate('260ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)' }))
      ]),
      // transition(':leave', animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })))

    ])
  ]
})
export class Tab2Page {
  // @ViewChild('swiperContainerEvents') swiperContainer!: ElementRef;

  swiper: Swiper
  imgRender: string = null
  imgSelected: string = null
  dateSelected: string = null
  trigger = true
  banners = [
    {
      img: '../../assets/banners/cultorosa.png',
      date: '2024-04-13'
    },{
      img: '../../assets/banners/E-TEMPO-TELAO.png',
      date: '2024-04-14'
    },{
      img: '../../assets/banners/PROJETO-DE-VIDA.png',
      date: '2024-04-28'
    }
  ]
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

  constructor() {}

  ionViewDidEnter() {
    // this.swiper = this.swiper ?? new Swiper(this.swiperContainer.nativeElement, {
    //   slidesPerView: 2.5,
    //   spaceBetween: 10,
    // });
  }

  handlerSelectedImage() {
    this.trigger = !this.trigger
    const response = this.banners.filter(banner => banner.date === this.dateSelected?.split('T')[0])
    if(!response.length) return this.imgSelected = null
    return this.imgSelected = response[0].img
  }
}
