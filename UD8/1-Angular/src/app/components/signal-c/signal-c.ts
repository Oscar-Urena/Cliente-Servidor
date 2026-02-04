import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [CommonModule],
  templateUrl: './signal-c.html',
  styles: ``,
})


export class SignalC {
  //Signal permite guardar un valor y reaccionar automáticamente cuando cambia.
  //Se lee con (), y se actualiza con .set() o .update()
  public contador=signal(0);
  //establecer la reaccion cuando cambia el signal contador
  public doble:Signal<number> =computed(()=>this.contador()*2);
  public triple:Signal<number> =computed(()=>this.contador()*3);
  public par:Signal<string> = computed(()=>(this.contador()%2) ? "Es impar" : "Es par" );

  aumentar(): void {
    console.log("Hola");
    this.contador.update(valor=>valor+1);
  }
  disminuir(): void {
    this.contador.update(valor=>valor-1);
  }
  resetear(): void {
    this.contador.set(0);
  }
}
