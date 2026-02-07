import { Component, signal } from '@angular/core';

import { NgStyle } from '@angular/common';
import { tarjetaEstudiante } from '../tarjetaEstudiantes/tarjetaEstudiantes';
import { Estudiante } from '../../interfaces/estudiante';


@Component({
  selector: 'app-listaEstudiantes',
  imports: [tarjetaEstudiante, NgStyle],
  templateUrl: './listaEstudiantes.html',
  styleUrl: './listaEstudiantes.css',
})
export class listaEstudiantes {
  public estudiantes: Estudiante[] = [
    { id: 1, nombre: "Juan Manuel", edad: 15, promedio: 7.5 },
    { id: 2, nombre: "María García", edad: 16, promedio: 8.2 },
    { id: 3, nombre: "Carlos López", edad: 15, promedio: 6.8 },
    { id: 4, nombre: "Ana Martínez", edad: 17, promedio: 9.1 },
    { id: 5, nombre: "Pedro Rodríguez", edad: 16, promedio: 7.9 },
    { id: 6, nombre: "Laura Fernández", edad: 15, promedio: 8.5 },
    { id: 7, nombre: "Paco Fiestas", edad: 26, promedio: 4.5 }
  ];

  public contadorActual ={
    "background-color": "green",
  }
  

  cambiarFondoNaranja():void{
    this.contadorActual = {
      "background-color": "orange"
    }
  }
  cambiarFondoVerde():void{
    this.contadorActual = {
      "background-color": "green"
    }
  }
}
