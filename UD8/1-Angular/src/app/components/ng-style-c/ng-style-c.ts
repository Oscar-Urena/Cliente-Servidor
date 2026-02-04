import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-style-c',
  imports: [NgStyle],
  templateUrl: './ng-style-c.html',
  styles: ``,
})
export class NStyleC {
  public fontSize: number = 16;
  public nombreTema: string = "Tema azul";
  public estilosTemaActual = {
    "background-color": "blue",
    "color": "white",
    "border-radius": "10px",
    "font-weight": "bold"
  }

  aumentarFont(): void {
    this.fontSize += 2;
  
  }

  
  cambiarEstiloRojo(): void {
    this.nombreTema = "Tema Rojo";
    this.estilosTemaActual = {
    "background-color": "red",
    "color": "white",
    "border-radius": "10px",
    "font-weight": "bold"
    }
  }

  cambiarEstiloVerde(): void {
    this.nombreTema = "Tema Verde";
    this.estilosTemaActual = {
    "background-color": "green",
    "color": "white",
    "border-radius": "10px",
    "font-weight": "bold"
  }

}

}
