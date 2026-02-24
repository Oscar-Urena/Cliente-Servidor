import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Juego } from '../../interfaces/juego';
import { JuegoService } from '../../services/juego';
import { CommonModule } from '@angular/common';
import { AnioPipe } from '../../pipes/anio-pipe';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-crud',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    CommonModule,
    AnioPipe
  ],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud implements OnInit, AfterViewInit {

  private JuegoServices = inject(JuegoService);
  private router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'titulo', 'genero', 'plataforma', 'anio', 'precio', 'rating', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Juego>;

  
  constructor() {
    this.dataSource = new MatTableDataSource<Juego>([]);
  }

  ngOnInit(): void {
    this.cargarJuegos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarJuegos(): void {
    this.JuegoServices.getJuegos().subscribe({
      next: (Juego: any) => {
        this.dataSource.data = Juego.data;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al cargar los juegos', error);
      }
    });
  }

  actualizarJuego(juego: Juego): void{
    
  }

  editar(juego:Juego):void{
    this.router.navigate([`/formulario/${juego.id}`]);
  }

  eliminar(juego:Juego):void{
    this.JuegoServices.eliminar(juego.id).subscribe({
      next: () =>{
        this.cargarJuegos();
      },
      error:(error) =>{
        console.error('Error al eliminar el juego', error);
      }
    });
  }
}