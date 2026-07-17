import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Rutina } from '../models/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private STORAGE_KEY = 'rutinas';
  private storageReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {

    if (!this.storageReady) {
      await this.storage.create();
      this.storageReady = true;
    }

  }

  async obtenerRutinas(): Promise<Rutina[]> {

    await this.init();

    return (await this.storage.get(this.STORAGE_KEY)) || [];

  }

  async guardarRutinas(rutinas: Rutina[]) {

    await this.init();

    await this.storage.set(this.STORAGE_KEY, rutinas);

  }

  async agregarRutina(nombre: string) {

    const rutinas = await this.obtenerRutinas();

    const nuevaRutina: Rutina = {
      id: Date.now(),
      nombre,
      completada: false
    };

    rutinas.push(nuevaRutina);

    await this.guardarRutinas(rutinas);

  }

  async eliminarRutina(id: number) {

    let rutinas = await this.obtenerRutinas();

    rutinas = rutinas.filter(r => r.id !== id);

    await this.guardarRutinas(rutinas);

  }

  async cambiarEstado(id: number) {

    const rutinas = await this.obtenerRutinas();

    const rutina = rutinas.find(r => r.id === id);

    if (rutina) {

      rutina.completada = !rutina.completada;

      await this.guardarRutinas(rutinas);

    }

  }

  async reordenar(rutinas: Rutina[]) {

    await this.guardarRutinas(rutinas);

  }

  async editarRutina(id: number, nuevoNombre: string) {

    const rutinas = await this.obtenerRutinas();

    const rutina = rutinas.find(r => r.id === id);

    if (rutina) {

      rutina.nombre = nuevoNombre;

      await this.guardarRutinas(rutinas);

    }

  }

}