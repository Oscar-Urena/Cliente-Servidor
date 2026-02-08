import { Component, input, output } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante';
import { CommonModule, NgClass } from '@angular/common';
import { notapipe } from '../../pipes/nota-pipe';

@Component({
  selector: 'app-tarjetaEstudiante',
  imports: [NgClass, CommonModule, notapipe],
  templateUrl: './tarjetaEstudiantes.html',
  styleUrl: './tarjetaEstudiantes.css',
})
export class tarjetaEstudiante {
  public estudiante = input.required<Estudiante>();

  obtenerEstiloBoton() {
    const promedio = this.estudiante().promedio;
    return {
      "background": promedio >= 5 ? "#3498db" : "#e74c3c",
      "color": "white",
      "padding": "8px",
      "border-radius": "5px",
      "margin": "10px 0",
      "text-align": "center",
      "font-weight": "bold",
    };
  }
  
  eliminar():void{
  }
  
}
