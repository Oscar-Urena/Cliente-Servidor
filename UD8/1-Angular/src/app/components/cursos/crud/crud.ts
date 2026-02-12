import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CursoServices } from '../../../services/curso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Curso } from '../../../interfaces/curso';
import { error } from 'console';

@Component({
  selector: 'app-crud',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
    ],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {
  private CursoService = inject(CursoServices);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'idCurso', 'Descripcion'];
  dataSource: MatTableDataSource<Curso>;

  constructor(){
    this.dataSource = new MatTableDataSource<Curso>([]);
  }

  ngOnInit():void{
    this.cargarCursos();
  }

  cargarCursos():void{
    this.CursoService.getCursos().subscribe({
      next: (cursos: any) =>{
        this.dataSource.data = cursos.data;
      },
      error: (error)=>{
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  nuevoCurso():void{
    console.log("Aqui aparecería un formulario");
  }



}
