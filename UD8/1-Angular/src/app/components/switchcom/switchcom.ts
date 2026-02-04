import { Component } from '@angular/core';

@Component({
  selector: 'app-switchcom',
  imports: [],
  templateUrl: './switchcom.html',
  styles: ``,
})
export class Switchcom {
  public tipoAlerta:string = 'primary'
  cambiarAlerta(clase:string):void{
    this.tipoAlerta = clase;
  }
}
