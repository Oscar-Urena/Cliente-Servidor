import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioServices } from '../../../services/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    MatTooltipModule

  ],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {

  private usuarioService = inject(UsuarioServices); // Inyectamos el servicio UsuarioServices para poder utilizar sus métodos y obtener la lista de usuarios, así como realizar operaciones de edición y eliminación. Esto nos permitirá interactuar con la API para gestionar los usuarios desde este componente.
  private snackBar = inject(MatSnackBar); // Inyectamos el servicio MatSnackBar para mostrar notificaciones de éxito o error al eliminar un usuario. Esto mejora la experiencia del usuario al proporcionar retroalimentación inmediata sobre las acciones realizadas.
  private router = inject(Router); // Inyectamos el servicio Router para poder redirigir al usuario a la página de creación de un nuevo usuario cuando haga clic en el botón "Nuevo Usuario"

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'active', 'actions']; // Define las columnas que se mostrarán en la tabla
  dataSource: MatTableDataSource<Usuario>; // Fuente de datos para la tabla, se inicializa en el constructor

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador de la tabla, se asigna después de que la vista se haya inicializado
  @ViewChild(MatSort) sort!: MatSort; // Referencia al componente de ordenamiento de la tabla, se asigna después de que la vista se haya inicializado

  constructor() {
    this.dataSource = new MatTableDataSource<Usuario>([]); // Inicializa la fuente de datos con un array vacío, se llenará con los usuarios obtenidos del servicio  
  }

  ngOnInit(): void { // Método del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado  

    this.cargarUsuarios();
    console.log('primera vez');


  }

  ngAfterViewInit() { // Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido completamente inicializada, es el momento adecuado para asignar el paginador y el ordenamiento a la fuente de datos
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: any) => {
        console.log("cargar usuarios");
        this.dataSource.data = usuarios.data;
         //  Forzar detección de cambios
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  nuevoUsuario(): void {

    this.router.navigateByUrl('/formulario'); // Redirige a la página del formulario para crear un nuevo usuario  
  }

  // Método para editar un usuario, redirige a la página del formulario pasando el ID del usuario como parámetro en la URL para que el formulario pueda cargar los datos del usuario y permitir su edición.
  editarUsuario(usuario: Usuario): void {
    this.router.navigate(['/formulario'], { // Redirige a la página del formulario para editar el usuario seleccionado, pasando el ID del usuario como parámetro en la URL para que el formulario pueda cargar los datos del usuario y permitir su edición.
      queryParams: { id: usuario._id }
    });

  }

  // Método para eliminar un usuario, muestra una confirmación antes de eliminar y luego llama al servicio para eliminar el usuario. Si la eliminación es exitosa, recarga la lista de usuarios; si hay un error, muestra una notificación de error.
  eliminarUsuario(usuario: Usuario): void {
    const snackRef = this.snackBar.open(
      `¿Eliminar a ${usuario.name}?`,
      'Confirmar',
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['snack-warning'],
      }
    );

    // Si el usuario hace clic en "Confirmar", se ejecuta esta función para eliminar el usuario
    snackRef.onAction().subscribe(() => { // Si el usuario hace clic en "Confirmar", se ejecuta esta función para eliminar el usuario 
      this.usuarioService.deleteUsuario(usuario._id!).subscribe({ //
        next: () => {
          this.cargarUsuarios();
        },
        error: () => {
          this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snack-error']
          });
        }
      });


    })
  }
}

