import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonRange
} from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonRange,
    CommonModule,
    FormsModule
  ]
})
export class Tab4Page implements OnInit {

  podcasts = [
    {
      id: 1,
      titulo: 'Entrenamiento para Principiantes',
      descripcion: 'Aprende los ejercicios básicos.',
      audio: 'assets/audio/podcast1.mp3'
    },
    {
      id: 2,
      titulo: 'Rutina HIIT',
      descripcion: 'Entrenamiento de alta intensidad.',
      audio: 'assets/audio/podcast2.mp3'
    },
    {
      id: 3,
      titulo: 'Fuerza y Musculación',
      descripcion: 'Consejos para ganar masa muscular.',
      audio: 'assets/audio/podcast3.mp3'
    }
  ];

  progreso = 0;

  foto: string | undefined;

  mensajeQR = '';

  audio = new Audio();

  intervalo: any;

  constructor() { }

  ngOnInit() {

    this.audio.src = this.podcasts[0].audio;

    this.audio.addEventListener('timeupdate', () => {

      if (this.audio.duration > 0) {

        this.progreso =
          (this.audio.currentTime / this.audio.duration) * 100;

      }

    });

  }

  playAudio() {

    this.audio.play();

  }

  pauseAudio() {

    this.audio.pause();

  }

  stopAudio() {

    this.audio.pause();

    this.audio.currentTime = 0;

    this.progreso = 0;

  }

  async tomarFoto() {

    try {

      const imagen = await Camera.getPhoto({

        quality: 90,

        allowEditing: false,

        resultType: CameraResultType.DataUrl,

        source: CameraSource.Camera

      });

      this.foto = imagen.dataUrl!;

    } catch (error) {

      console.error(error);

    }

  }

  async escanearQR() {

    try {

      const permiso = await BarcodeScanner.requestPermissions();

      if (permiso.camera !== 'granted') {

        this.mensajeQR = 'Permiso de cámara denegado';

        return;

      }

      const resultado = await BarcodeScanner.scan();

      if (resultado.barcodes.length > 0) {

        this.mensajeQR =
          '✅ Asistencia registrada\n\n' +
          resultado.barcodes[0].displayValue;

      } else {

        this.mensajeQR = 'No se detectó ningún código QR';

      }

    } catch (error) {

      console.error(error);

      this.mensajeQR = 'Error al escanear el código QR';

    }

  }

}