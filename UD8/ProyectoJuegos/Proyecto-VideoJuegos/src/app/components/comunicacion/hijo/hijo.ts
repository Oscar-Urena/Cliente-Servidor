import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, input, output } from '@angular/core';
import { Juego } from '../../../interfaces/juego';

@Component({
  selector: 'app-hijo',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css'
})
export class Hijo {
  public juego = input.required<Juego>();
  public votado = output<string>();

  votar(): void {
    console.log('votar ejecutado');
    this.votado.emit(this.juego().titulo);
  }
}