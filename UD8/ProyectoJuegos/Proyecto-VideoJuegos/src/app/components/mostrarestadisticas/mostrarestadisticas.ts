import { Component, effect, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Estadisticas } from '../../interfaces/estadisticas';

@Component({
  selector: 'app-mostrarestadisticas',
  imports: [RouterOutlet],
  templateUrl: './mostrarestadisticas.html',
  styleUrl: './mostrarestadisticas.css',
})
export class Mostrarestadisticas {
  public estadisticas = input.required<Estadisticas>();
}
