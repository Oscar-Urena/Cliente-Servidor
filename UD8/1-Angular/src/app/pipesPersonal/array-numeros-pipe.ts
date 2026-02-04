import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayNumeros',
})
export class ArrayNumerosPipe implements PipeTransform {

  transform(value: number[], min: number, max: number): number[] {
    return value.filter(n => n >= min && n <= max).sort((a, b) => b - a);
  }

}
