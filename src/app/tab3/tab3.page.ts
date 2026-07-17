import { Component, AfterViewInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBadge,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';

import * as L from 'leaflet';

import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab3',
  standalone: true,
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBadge,
    IonFab,
    IonFabButton
  ]
})
export class Tab3Page implements AfterViewInit {

  online = true;

  private map!: L.Map;

  private marcadorActual!: L.Marker;

  constructor() {}

  async ngAfterViewInit() {

    await this.verificarConexion();

    await this.crearMapa();

  }

  async verificarConexion() {

    const status = await Network.getStatus();

    this.online = status.connected;

    Network.addListener('networkStatusChange', status => {

      this.online = status.connected;

    });

  }

  async crearMapa() {

    const posicion = await Geolocation.getCurrentPosition();

    const lat = posicion.coords.latitude;

    const lng = posicion.coords.longitude;

    this.map = L.map('map').setView([lat, lng], 16);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap'
      }
    ).addTo(this.map);

    this.marcadorActual = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('📍 Tu ubicación')
      .openPopup();

    this.agregarMarcadores();

  }

  agregarMarcadores() {

    const miUbicacion = this.marcadorActual.getLatLng();

    const lugares = [

      {
        nombre: '🏋️ Área de Pesas',
        lat: miUbicacion.lat + 0.00020,
        lng: miUbicacion.lng + 0.00020
      },

      {
        nombre: '🏃 Zona Cardio',
        lat: miUbicacion.lat - 0.00020,
        lng: miUbicacion.lng + 0.00020
      },

      {
        nombre: '🧘 Sala de Yoga',
        lat: miUbicacion.lat + 0.00020,
        lng: miUbicacion.lng - 0.00020
      },

      {
        nombre: '🚿 Vestidores',
        lat: miUbicacion.lat - 0.00020,
        lng: miUbicacion.lng - 0.00020
      }

    ];

    lugares.forEach(lugar => {

      L.marker([lugar.lat, lugar.lng])
        .addTo(this.map)
        .bindPopup(lugar.nombre);

    });

  }

  async irMiUbicacion() {

    const posicion = await Geolocation.getCurrentPosition();

    const lat = posicion.coords.latitude;

    const lng = posicion.coords.longitude;

    this.map.setView([lat, lng], 17);

    this.marcadorActual
      .setLatLng([lat, lng])
      .bindPopup('📍 Tu ubicación')
      .openPopup();

  }

}