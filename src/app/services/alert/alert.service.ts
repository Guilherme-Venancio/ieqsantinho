import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert: AlertController) { }

  present(header: string, message: string) {
    this.alert.create({
      header: header,
      message: message,
      mode: 'ios',
      buttons: [
        'Ok'
      ]
    }).then(e => e.present())
   }

   async presentOptions(header: string, message: string) {
    let b
    let a = await this.alert.create({
      header: header,
      message: message,
      cssClass: 'alert-button',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => b = false,
          cssClass: 'alet-button-cancel',
          role: 'cancel'
        },
        {
          cssClass: 'alet-button-activatable',
          text: 'Confirmar',
          handler: () => b = true
        }
      ]
    })
    await a.present()
    await a.onDidDismiss()
    return b
   }

   async presentInput(header: string, message: string) {
    let b
    let c
    let a = await this.alert.create({
      header: header,
      message: message,
      cssClass: 'alert-button',
      mode: 'ios',
      inputs: [{
        name: 'text',
        type: 'text',
        value: c,
        min: 11,
        max: 11
      }],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => b = false,
          cssClass: 'alet-button-cancel',
          role: 'cancel'
        },
        {
          cssClass: 'alet-button-activatable',
          text: 'Confirmar',
          handler: (data) => {
            b = true;
            c = data.text;
          }
        }
      ]
    })
    await a.present()
    await a.onDidDismiss()
    return c
   }
}
