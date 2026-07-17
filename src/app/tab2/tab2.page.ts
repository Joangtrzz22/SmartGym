import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
  IonReorderGroup,
  IonReorder,
  AlertController
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemReorderEventDetail } from '@ionic/angular';

import { RutinaService } from '../services/rutina';
import { Rutina } from '../models/rutina';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonRefresher,
    IonRefresherContent,
    IonReorderGroup,
    IonReorder
  ]
})
export class Tab2Page {

  rutinas: Rutina[] = [];

  nuevaRutina = '';

  private temporizador: any;

  constructor(
    private rutinaService: RutinaService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.cargarRutinas();
  }

  async cargarRutinas() {
    this.rutinas = await this.rutinaService.obtenerRutinas();
  }

  async agregarRutina() {

    if (this.nuevaRutina.trim() === '') return;

    await this.rutinaService.agregarRutina(this.nuevaRutina);

    this.nuevaRutina = '';

    await this.cargarRutinas();

  }

  async eliminar(id: number) {

    await this.rutinaService.eliminarRutina(id);

    await this.cargarRutinas();

  }

  async cambiarEstado(id: number) {

    await this.rutinaService.cambiarEstado(id);

    await this.cargarRutinas();

  }

  async refrescar(event: any) {

    await this.cargarRutinas();

    event.target.complete();

  }

  async reordenar(event: CustomEvent<ItemReorderEventDetail>) {

    const from = event.detail.from;
    const to = event.detail.to;

    const item = this.rutinas.splice(from, 1)[0];

    this.rutinas.splice(to, 0, item);

    event.detail.complete();

    await this.rutinaService.reordenar(this.rutinas);

  }

  iniciarLongPress(rutina: Rutina) {

    this.temporizador = setTimeout(() => {

      this.editarRutina(rutina);

    }, 800);

  }

  cancelarLongPress() {

    clearTimeout(this.temporizador);

  }

  async editarRutina(rutina: Rutina) {

    const alert = await this.alertController.create({

      header: 'Editar Rutina',

      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: rutina.nombre
        }
      ],

      buttons: [

        {
          text: 'Cancelar',
          role: 'cancel'
        },

        {
          text: 'Guardar',

          handler: async (data) => {

            if (data.nombre.trim() !== '') {

              await this.rutinaService.editarRutina(
                rutina.id,
                data.nombre
              );

              await this.cargarRutinas();

            }

          }

        }

      ]

    });

    await alert.present();

  }

}