import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Contact } from '../models/Contact';
import { ModalPhotoCompetitorComponent } from '../components/modal-photo-competitor/modal-photo-competitor.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  public contact: Contact;
  edit: boolean = false
  editName: string = ''

  constructor(
    private modal: ModalController
  ) {}

  ngOnInit() {
    const daata =  {
      photo: '../../assets/logo/1633539455254.jpg',
      firstName: 'Guilherme',
      lastName: 'Venâncio',
      id: '1',
      phone: '(31) 9 8306-8810',
      email: 'guilhermevenancio28@hotmail.com',
      category: 'Membro'
    }
    this.contact = daata
    this.editName = this.contact.firstName + ' ' + this.contact.lastName
  }

  openPhoto() {
    this.modal.create({
      component: ModalPhotoCompetitorComponent,
      componentProps: { photo: this.contact.photo },
      cssClass: 'amodal',
      backdropDismiss: false,
    }).then(modal => {
      modal.present()
      modal.onDidDismiss().then(result =>{
        this.contact.photo = <string>result.data
      })
    })
  }

  saveContact() {
    if(this.edit) {
      const editName = this.editName.split(' ')
      if(!editName[1]) return window.alert('Nescessário ao mínimo um sobrenome')
      this.contact.firstName = editName[0]
      this.contact.lastName = editName[1]
    }
    this.edit = !this.edit
  }

  ngOnDestroy() {
    // this.sub1.unsubscribe();
  }

}
