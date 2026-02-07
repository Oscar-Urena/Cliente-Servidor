import { Component, input, output } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante';

@Component({
  selector: 'app-tarjetaEstudiante',
  imports: [],
  templateUrl: './tarjetaEstudiantes.html',
  styleUrl: './tarjetaEstudiantes.css',
})
export class tarjetaEstudiante {
  public estudiante = input.required<Estudiante>();
}
