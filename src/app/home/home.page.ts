import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { PhotoModalComponent } from '../components/photo-modal/photo-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  photos: {
    dataUrl: string,
    date: Date
  }[] = [];

  constructor(private modalController: ModalController) {}

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const currentImage = {
      dataUrl: image.dataUrl!,
      date: new Date()
    };
    this.photos.push(currentImage);
    console.log('Fotos después de agregar:', this.photos);
  }

  deletePhoto (index: number) {
    this.photos.splice(index, 1);
    console.log('Fotos después de eliminar:', this.photos);
  }

  async openModal (photo: { dataUrl: string, date: Date }) {
    const modal = await this.modalController.create({
      component: PhotoModalComponent,
      componentProps: { photo }
    });
    return await modal.present();
  }

}
