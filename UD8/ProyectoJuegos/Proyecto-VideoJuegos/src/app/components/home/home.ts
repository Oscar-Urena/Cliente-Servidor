import { Component, signal } from '@angular/core';
import { Mostrarestadisticas } from '../mostrarestadisticas/mostrarestadisticas';
import { Estadisticas } from '../../interfaces/estadisticas';

@Component({
  selector: 'app-home',
  imports: [Mostrarestadisticas],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  estadisticas = signal<Estadisticas>({
    generos : 0,
    mejor_valorado:"",
    plataformas:0,
    precio_medio:"",
    rating_medio:"",
    total_juegos:0
  });
  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const response = await fetch('http://localhost:3000/api/games/estadisticas');
      const data = await response.json();
      this.estadisticas.set(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
