import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {
  //Recogida de variables por parte del padre
  public volumen = input.required<number>(); //Variable que recibe del padre
  public nombre = input<string>("Control default");

  //Envio de datos del hijo al padre

  public volumenCambiado = output<number>();

  bajar():void{
    this.volumenCambiado.emit(Math.max(this.volumen()-5,0));
  }
  subir():void{
    this.volumenCambiado.emit(Math.min(this.volumen()+5,100));
  }
  silencio():void{  
    this.volumenCambiado.emit(0);
  }
  maximo():void{
    this.volumenCambiado.emit(100);
  }
}
