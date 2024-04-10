import { Component, OnInit, ViewChild } from '@angular/core';
import bibleData from './acf.json';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';
import { AlertService } from '../services/alert/alert.service';
import { ModalFavoritesVersesComponent } from '../components/modal-favorites-verses/modal-favorites-verses.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild(IonContent) content: IonContent;

  bibleData = bibleData
  selectedBook: any = null
  selectedchapter: any = null
  current: number = 1
  favoritesVersers: any = [{
    book: '',
    chapter: '',
    verse: ''
  }]
  optionsToolbar: [{index: number,verse: string}] | null = null

  constructor(
    private platform: Platform,
    private alert: AlertService,
    private modal: ModalController
  ) {   }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(this.current === 3) {
        localStorage.setItem('lastestVerses', JSON.stringify({book: this.selectedBook, chapter: this.selectedchapter}))
        // const lastestVersesArray = !lastestVerses || lastestVerses === 'undefined' || lastestVerses === 'null' ? [] : JSON.parse(lastestVerses)
        // lastestVersesArray.push({book: this.selectedBook, chapter: this.selectedchapter})
      }
      this.optionsToolbar = null
      if(this.current > 1) this.current = this.current - 1
    });
  }

  scrollToIndex(index: number) {
    const yOffset = document.getElementById(`item-${index}`).offsetTop;

    this.content.scrollToPoint(0, yOffset, 500);
  }

  openOptionsToolbar(i, verse) {
    if(!this.optionsToolbar) return this.optionsToolbar = [{index: i, verse: verse}]
    const index = this.optionsToolbar.findIndex(e => e.index === i)
    if(index > -1) {
      this.optionsToolbar.splice(index, 1)
      return
    }
    this.optionsToolbar.push({index: i, verse: verse})
    this.optionsToolbar.sort((a, b) => a.index - b.index)
  }

  async saveFavoriteVerse(book, chapter, verse) {
    const title = await this.alert.presentInput('Digite uma anotação','')
    if(!title) return
    const favoritesVerses = localStorage.getItem('favoritesVerses')
    const favoritesVersesArray = !favoritesVerses || favoritesVerses === 'undefined' || favoritesVerses === 'null' ? [] : JSON.parse(favoritesVerses)
    favoritesVersesArray.push({book, chapter, verse, title: title})
    localStorage.setItem("favoritesVerses", JSON.stringify(favoritesVersesArray));
    this.optionsToolbar = null
  }

  openFavoriteVerse() {
    let favoritesVerses = localStorage.getItem('favoritesVerses')
    favoritesVerses = !favoritesVerses || favoritesVerses === 'undefined' || favoritesVerses === 'null' ? [] : JSON.parse(favoritesVerses)
    this.modal.create({
      component: ModalFavoritesVersesComponent,
      componentProps: { favoritesVerses: favoritesVerses },
      cssClass: 'amodal',
      backdropDismiss: false,
    }).then(modal => {
      modal.present()
      modal.onDidDismiss().then(result =>{
        if(result.data) {
          this.selectedBook = result.data?.book
          this.selectedchapter = result.data?.chapter
          this.current = 3
          const timeout = setTimeout(() => {
            this.scrollToIndex(result.data?.verse[0].index)
            this.optionsToolbar = result.data?.verse
            clearTimeout(timeout)
          }, 100);
        }
        })
    })
  }

  writeToClipboard = async (selectedBook, selectedchapter, optionsToolbar) => {
    const verses = this.optionsToolbar.map(e => e.index + 1 + '- ' + e.verse)
    const verse = verses.join(" \n \n")
    await Clipboard.write({
      string: `${selectedBook.name}: ${(selectedchapter + 1)} \n \n ${verse}`
    });
    this.optionsToolbar = null
  };

  shareVerse = async (selectedBook, selectedchapter) => {
    const verses = this.optionsToolbar.map(e => e.index + 1 + '- ' + e.verse)
    const verse = verses.join("\n\n")
    await Share.share({
      text: `${selectedBook.name}: ${(selectedchapter + 1)} \n \n ${verse}`
    });
    this.optionsToolbar = null
  };

  verifyVerseSelected(i, verse) {
    if(this.optionsToolbar === null) return false
    const result = this.optionsToolbar.filter(e => e.verse.includes(verse) && e.index === i)
    if(result.length) return true
    else return false
  }
}
