import { Component, signal } from '@angular/core';
import { Mostrarestadisticas } from '../mostrarestadisticas/mostrarestadisticas';

@Component({
  selector: 'app-home',
  imports: [Mostrarestadisticas],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  estadisticas = signal<any>(null);
  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const response = await fetch('http://localhost:3000/api/games/estadisticas');
      const data = await response.json();
      this.estadisticas.set(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
