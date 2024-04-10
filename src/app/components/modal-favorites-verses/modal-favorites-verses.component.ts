import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-favorites-verses',
  templateUrl: './modal-favorites-verses.component.html',
  styleUrls: ['./modal-favorites-verses.component.scss'],
})
export class ModalFavoritesVersesComponent  implements OnInit {
  @Input('favoritesVerses') favoritesVerses: any[] = [];
  versesViews: string = ''

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
    console.log(this.favoritesVerses)
    this.favoritesVerses.forEach(favoriteVerses => {
      favoriteVerses.verse.forEach((verse, i) => {
        if(i == 0) {
          this.versesViews = (verse.index + 1) + '-'
        }
        if(i == favoriteVerses.verse.length - 1) {
          this.versesViews += verse.index + 1
        }
      });
    })
  }

  selectedVerses(favoriteVerses) {
    this.modalCtrl.dismiss(favoriteVerses)
  }

}
