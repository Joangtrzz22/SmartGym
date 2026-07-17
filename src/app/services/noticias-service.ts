import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fitness } from '../models/fitness';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  obtenerNoticias(): Observable<Fitness[]> {

    const noticias: Fitness[] = [

      {
        id: 1,
        titulo: 'Entrenamiento de Fuerza',
        descripcion: 'Entrena cada grupo muscular al menos dos veces por semana para desarrollar fuerza y masa muscular.',
       imagen: 'https://picsum.photos/id/1011/800/500'
      },

      {
        id: 2,
        titulo: 'Nutrición Deportiva',
        descripcion: 'Consumir proteínas y carbohidratos después del entrenamiento favorece la recuperación muscular.',
        imagen: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'
      },

      {
        id: 3,
        titulo: 'Mantente Hidratado',
        descripcion: 'Beber suficiente agua antes, durante y después del entrenamiento mejora el rendimiento físico.',
        imagen: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800'
      },

      {
        id: 4,
        titulo: 'Descanso',
        descripcion: 'Dormir entre 7 y 9 horas diarias ayuda a la recuperación muscular y mejora el rendimiento.',
        imagen: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800'
      },

      {
        id: 5,
        titulo: 'Cardio Inteligente',
        descripcion: 'Combina ejercicios cardiovasculares con entrenamiento de fuerza para mejores resultados.',
        imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
      }

    ];

    return of(noticias);
  }
}