import { Component } from '@angular/core';
import { Personal } from '../../interfaces/personal';

@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  public title:string="Angular";
  public datosPersona:Personal={
    nombre: "Óscar",
    apellidos: "Ureña Salvador"
  };
}
