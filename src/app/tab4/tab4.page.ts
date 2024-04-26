import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Contact } from '../models/Contact';
import { ModalPhotoCompetitorComponent } from '../components/modal-photo-competitor/modal-photo-competitor.component';
import { UsersService } from '../services/users/users.service';
import { Subscription } from 'rxjs';
import { User } from '../models/User';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  edit: boolean = false
  editName: string = ''
  firstName: string = ''
  lastName: string = ''
  private subscription1: Subscription;
  user: User = new User()

  constructor(
    private modal: ModalController,
    private usersService: UsersService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.subscription1 = this.usersService.getUserEvent().subscribe((user:User) => {
      if(user) this.user = user
    })
    this.user = this.usersService.user
    for (let index = 1; index < this.user.fullName.split(' ').length; index++) {
      this.lastName += ' ' + this.user.fullName.split(' ')[index]
    }
    this.firstName = this.user.fullName?.split(' ')[0]
    this.lastName = this.lastName.replace('undefined', '')
    this.editName = this.firstName + this.lastName
  }

  openPhoto() {
    this.modal.create({
      component: ModalPhotoCompetitorComponent,
      componentProps: { photo: this.user.photo },
      cssClass: 'amodal',
      backdropDismiss: false,
    }).then(modal => {
      modal.present()
      modal.onDidDismiss().then(result =>{
        if(result.data) {
          this.storageService.uploadBlob(result.data, `users/${Date.now()}`).then(url => {
            this.user.photo = url
            this.usersService.updateUser(this.user)
          })
        }
      })
    })
  }

  saveUser() {
    if(this.edit) {
      const editName = this.editName.split(' ')
      if(editName.length < 1) return window.alert('Nescessário ao mínimo um sobrenome')
      this.user.fullName = this.editName
      this.usersService.updateUser(this.user)
    }
    this.edit = !this.edit
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

}
