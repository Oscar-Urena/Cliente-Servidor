import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Hijo } from '../hijo/hijo';
import { JuegoService } from '../../../services/juego';
import { Juego } from '../../../interfaces/juego';


@Component({
  selector: 'app-padre',

  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Hijo
  ],
  templateUrl: './padre.html',
  styleUrl: './padre.css'
})
export class Padre  {

  private JuegosBD = inject(JuegoService);
  public juegoS = signal<Juego[]>([]);
  
  public juegoVotado: String = "";
  ngOnInit():void{
    this.cargarJuegos();
  }

  cargarJuegos():void{
    this.JuegosBD.getJuegos().subscribe({
      next: (juegos: any) =>{
        this.juegoS.set(juegos.data);
      }
    })
  }

  votado(juego: string){
    this.juegoVotado = juego;
  }
  
}
