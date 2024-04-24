import { Component } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  banners = ['../../assets/banners/cultorosa.png',
            '../../assets/banners/E-TEMPO-TELAO.png',
            '../../assets/banners/PROJETO-DE-VIDA.png'
          ]
  constructor() {
    for(let i = 0; i <= 10; i++) {
      this.banners.push(this.banners[i])
    }
  }

}
