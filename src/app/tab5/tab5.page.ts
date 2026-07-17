import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonToggle
} from '@ionic/angular/standalone';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    CommonModule,
    FormsModule
  ]
})
export class Tab5Page implements OnInit {

  nombre = 'Joan Gutierrez';
  objetivo = 'Ganar masa muscular';
  correo = 'joangtrzz22@gmail.com';

  recordarSesion = true;
  notificaciones = true;
  modoOscuro = false;

  dispositivos: string[] = [];
  historial: string[] = [];
  mensajeNFC = '';

  private STORAGE_KEY = 'perfil-smartgym';

  constructor(private storage: Storage) {}

  async ngOnInit() {

    await this.storage.create();

    const datos = await this.storage.get(this.STORAGE_KEY);

    if (datos) {

      this.recordarSesion = datos.recordarSesion ?? true;
      this.notificaciones = datos.notificaciones ?? true;
      this.modoOscuro = datos.modoOscuro ?? false;
      this.historial = datos.historial ?? [];

    }

  }

  async guardarConfiguracion() {

    await this.storage.set(this.STORAGE_KEY, {

      recordarSesion: this.recordarSesion,
      notificaciones: this.notificaciones,
      modoOscuro: this.modoOscuro,
      historial: this.historial

    });

} 
    async buscarDispositivos() {

    this.dispositivos = [
      '⌚ Smart Watch',
      '❤️ Banda Cardíaca',
      '🎧 Audífonos Bluetooth',
      '🚴 Bicicleta Inteligente'
    ];

    this.historial.push('📶 Se buscaron dispositivos Bluetooth.');

    await this.guardarConfiguracion();

  }

  async compartirRutina() {

    this.mensajeNFC =
      '📲 Rutina SmartGym compartida correctamente (Simulación NFC).';

    this.historial.push('📲 Rutina compartida mediante NFC.');

    await this.guardarConfiguracion();

  }

}