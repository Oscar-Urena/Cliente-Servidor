import { Component } from '@angular/core';

@Component({
  selector: 'app-ejemplo-componente',
  imports: [],
  templateUrl: './ejemplo-componente.html',
  styleUrl: './ejemplo-componente.css',
})
export class EjemploComponente {
  public aProducts = [
    { id: 1, descripcion: 'ordenador', precio: 1200, categoria: 'electrodoméstico', stock: false },
    { id: 2, descripcion: 'smartphone', precio: 800, categoria: 'electrodoméstico', stock: true },
    { id: 3, descripcion: 'silla de escritorio', precio: 150, categoria: 'muebles', stock: true },
    { id: 4, descripcion: 'mesa de café', precio: 200, categoria: 'muebles', stock: true },
    { id: 5, descripcion: 'auriculares', precio: 100, categoria: 'electrodoméstico', stock: false },
  ];
}
