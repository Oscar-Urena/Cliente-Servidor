import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nota',
})
export class notapipe implements PipeTransform {

  transform(value: number): string {
    let msg:string = "";
    if(value >= 9){
        msg = "Sobresaliente";
    }else if(value >= 7){
        msg = "Notable";
    }else if(value >= 5){
        msg = "Aprobado";
    }else{
        msg = "Suspenso";
    }
    return msg; 
  }

}
