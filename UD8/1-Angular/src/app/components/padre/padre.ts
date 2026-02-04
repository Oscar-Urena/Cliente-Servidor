import { Component, signal } from '@angular/core';
import { Hijo } from '../hijo/hijo';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-padre',
  imports: [Hijo, NgStyle],
  templateUrl: './padre.html',
 styleUrl: './padre.css',
})
export class Padre {
  public volumen=signal(50);

  actualizarVolumen(volumenHijo:number):void{
    this.volumen.set(volumenHijo);
  }

}
