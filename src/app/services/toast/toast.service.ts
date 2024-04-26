import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toatsController: ToastController) { }
  
  success(message: string = 'Requisição realizada com sucesso', duration: number = 2000, position: any = 'top') {
    this.toatsController.create({position: position,color: 'success',message: message,duration: duration,cssClass: 'ion-toast'})
      .then(e => e.present())
  }

  error(message: string = 'Não foi possível realizar a requisição', duration: number = 2000, position: any = 'top') {
    this.toatsController.create({position: position,color: 'danger',message: message,duration: duration,cssClass: 'ion-toast'})
      .then(e => e.present())
  }

  info(message: string = 'Não foi possível realizar a requisição', duration: number = 2000, position: any = 'top') {
    this.toatsController.create({position: position,color: 'medium',message: message,duration: duration,cssClass: 'ion-toast'})
      .then(e => e.present())
  }
}
