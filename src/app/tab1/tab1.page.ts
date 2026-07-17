import { Component, inject } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';

import { NoticiasService } from '../services/noticias-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent
  ],
})
export class Tab1Page {

  private noticiasService = inject(NoticiasService);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);

  noticias: any[] = [];

  constructor() {
    this.cargarNoticias();
  }

  async cargarNoticias() {

    const loading = await this.loadingController.create({
      message: 'Cargando consejos de SmartGym...',
      spinner: 'crescent'
    });

    await loading.present();

    this.noticiasService.obtenerNoticias().subscribe({

      next: (data) => {
        this.noticias = data;
        loading.dismiss();
      },

      error: async () => {

        loading.dismiss();

        const toast = await this.toastController.create({
          message: 'No fue posible cargar los consejos.',
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        });

        await toast.present();

      }

    });

  }

  refrescar(event: any) {

    this.cargarNoticias();

    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }

}