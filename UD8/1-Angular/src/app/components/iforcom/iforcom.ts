import { Component } from '@angular/core';
import { Mensaje } from '../../interfaces/personal';

@Component({
  selector: 'app-iforcom',
  imports: [],
  templateUrl: './iforcom.html',
  styles: ``,
})
export class Iforcom {
  public mostrar: boolean = true;
  public mensajeAngular: Mensaje={
    lenguaje: "Angular",
    descripcion: "es un framework"
  }
  public mensajeJavascript: Mensaje={
    lenguaje: "Javascript",
    descripcion: "es un lenguaje scriptinf"
  }
  //crear un array de tipo string
  public aLenguajes:string[]=['PHP', 'JavaScript', 'TypeScript','Java']
  ejecutar(): void {
    this.mostrar = !this.mostrar;
  }
}
