import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-class-c',
  imports: [NgClass],
  templateUrl: './ng-class-c.html',
  styles: ``,
})
export class NgClassC {
    public claseAlerta:string = "alert alert-success";
    public mensajeAlerta:string = "Operación existosa";

    cambiarClase(clase:string, event:Event):void{
        this.claseAlerta=`alert alert-${clase}`;
        this.mensajeAlerta = `Operacion ${clase}`
    }
}
