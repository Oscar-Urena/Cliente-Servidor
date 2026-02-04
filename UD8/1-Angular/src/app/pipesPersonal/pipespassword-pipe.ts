import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipespassword',
})
export class PipespasswordPipe implements PipeTransform {

  transform(value: string, ):string {
    return value.replace(/./g, '*');
  }
}


