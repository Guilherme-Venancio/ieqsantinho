import { Component, Input, OnInit, ViewChild } from "@angular/core";
// import { LoadingService } from "../../../service/config/loading.service";
// import { Competitor } from "src/app/models/competitor/competitor.model";
// import { ToastService } from "src/app/service/config/toast.service";
import { Camera, CameraResultType } from "@capacitor/camera";
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from "ngx-image-cropper";
// import { CompetitorService } from "src/app/service/competitor/competitor.service";
import { Subscription } from "rxjs";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-photo-competitor",
  templateUrl: "./modal-photo-competitor.component.html",
  styleUrls: ["./modal-photo-competitor.component.scss"],
})
export class ModalPhotoCompetitorComponent implements OnInit {
  @Input('photo') photo: string = '';
  @ViewChild("cropper") cropper: ImageCropperComponent;

  img: any = "";
  croppedImage: any = "";
  transform: ImageTransform = {};
  competitorSubscription: Subscription;
  editPhoto: boolean = false;

  constructor(
    // private competitorService: CompetitorService,
    // private toastService: ToastService,
    // private loadingService: LoadingService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.img = this.photo || '../../../assets/svg/userGeneric.svg'
  }

  imageLoaded() {
    // this.loadingService.dismiss();
  }

  loadImageFailed() {
    console.log("Falha!");
  }
  async openPhotoGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        promptLabelHeader: "Selecione a foto",
        promptLabelPhoto: "Foto do dispositivo",
        promptLabelPicture: "Abrir câmera",
        promptLabelCancel: "Cancelar",
        presentationStyle: "popover",
      });
      // this.loadingService.present();
      this.croppedImage = `data:image/webp;base64,${image.base64String}`;
    } catch (error) {
      // this.toastService.error('Erro ao buscar a imagem')
      console.log(error);
    }
  }
  cropImage() {
    this.cropper.crop();
    this.croppedImage = null;
    this.editPhoto = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.img = event.base64;
  }

  handlerExit() {
    if (this.croppedImage) return this.cropImage();
    if (!this.editPhoto) return this.modalCtrl.dismiss();
    this.photo = this.img
    const blob = this.base64ToBlob(this.img.replace('data:image/webp;base64,', ''), 'image/webp');
    console.log(blob)
    this.modalCtrl.dismiss(blob);
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

}
