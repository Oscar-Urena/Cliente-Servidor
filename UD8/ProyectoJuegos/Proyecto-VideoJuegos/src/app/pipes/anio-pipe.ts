import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anio',
})
export class AnioPipe implements PipeTransform {

  transform(anio: number): any {
    const fecha = new Date().getFullYear();
    const diferencia = fecha - anio;
    let msg = `${anio} - `;
    if (diferencia == 0) msg += ` Nuevo`;
    else if (diferencia <= 3) msg += `${diferencia} años`;
    else if (diferencia <= 7) msg += `Moderno`;
    else if (diferencia <= 15) msg += `Clásico`;
    else msg += `Retro`;
    return msg;
  }

}
