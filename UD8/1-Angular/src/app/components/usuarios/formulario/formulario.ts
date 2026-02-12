
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioServices } from '../../../services/usuarios';

@Component({
  selector: 'app-formulario',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  public userForm: FormGroup;
  public hidePassword: boolean = true; // Variable para controlar la visibilidad de la contraseña
  public roles: string[] = ['Admin', 'Usuario', 'Editor', 'Visor']; // Ejemplo de roles para el select

  // Inyectamos el servicio Router para poder redirigir al usuario a la página de creación de un nuevo usuario cuando haga clic en el botón "Nuevo Usuario"
  private router = inject(Router); // Inyectamos el servicio Router para poder redirigir al usuario a la página de creación de un nuevo usuario cuando haga clic en el botón "Nuevo Usuario"
  private usuarioService = inject(UsuarioServices); // Inyectamos el servicio UsuarioServices para poder utilizar sus métodos y gestionar los usuarios desde este componente, como crear, actualizar o eliminar usuarios. 
  private snackBar = inject(MatSnackBar); // Inyectamos el servicio MatSnackBar para mostrar notificaciones de éxito o error al crear o actualizar un usuario. Esto mejora la experiencia del usuario al proporcionar retroalimentación inmediata sobre las acciones realizadas.
  private activatedRoute = inject(ActivatedRoute); // Inyectamos el servicio ActivatedRoute para poder obtener los parámetros de la URL
  private id!: string;


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''], // Campo para el ID del usuario, se puede usar para editar un usuario existente 
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      role: ['', [Validators.required]],
      active: [false] // Campo para el estado activo, por defecto es false
    });
  }

  ngOnInit(): void {
    
    //extraer parámetros de la URL
    this.activatedRoute.queryParams.subscribe(params => { // Suscribimos a los cambios en los parámetros de la ruta para obtener el ID del usuario que queremos editar, si es que se proporciona. Esto nos permite cargar los datos del usuario en el formulario para su edición. Si no se proporciona un ID, asumimos que estamos creando un nuevo usuario.
      this.id = params['id'];// Asignamos el valor del ID extraído de la URL a la variable id del componente para su uso posterior, como cargar los datos del usuario o actualizarlo.
      console.log(this.id);
      if (this.id) { //

        this.usuarioService.getUsuario(this.id).subscribe({ //
          next: (response: any) => { // Si la petición para obtener los datos del usuario es exitosa, se ejecuta esta función. Aquí puedes cargar los datos del usuario en el formulario para que el usuario pueda editarlos. Por ejemplo, puedes usar this.userForm.patchValue(response) para llenar el formulario con los datos del usuario obtenido de la API.
            // Cargar los datos del usuario en el formulario para su edición
            console.log(response.data, "hola");
            console.log(response.data.password, "password");
            this.userForm.controls['id'].setValue(response.data._id);
            this.userForm.controls['name'].setValue(response.data.name);
            this.userForm.controls['email'].setValue(response.data.email);
            this.userForm.controls['password'].setValue(response.data.password);
            this.userForm.controls['role'].setValue(response.data.role);
            this.userForm.controls['active'].setValue(response.data.active);
          }
          //OTRA FORMA DE CARGAR LOS DATOS DEL USUARIO EN EL FORMULARIO
          // this.userForm.patchValue({
          //   id: response._id,
          //   name: response.name,
          //   email: response.email,
          //   password: response.password,
          //   role: response.role,
          //   active: response.active
          // });
        })
      }
    })
  }

  /**getter's */
  get nombre() {
    return this.userForm.get('name') as FormControl; // as FormControl es para evitar la ?
  }
  get email() {
    return this.userForm.get('email') as FormControl; // as FormControl es para evitar la ?
  }
  get password() {
    return this.userForm.get('password') as FormControl; // as FormControl es para evitar la ?
  }
  get role() {
    return this.userForm.get('role') as FormControl; // as FormControl es para evitar la ?
  }
  get active() {
    return this.userForm.get('active') as FormControl; // as FormControl es para evitar la ?
  }




  onSubmit(): void {
    const usuario: Usuario = {
      _id: this.userForm.value.id, // El ID se asigna solo si estamos editando un usuario existente, para crear un nuevo usuario el ID se generará automáticamente en el backend.
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
      active: this.userForm.value.active
    };

    if (!this.id) { // Si no hay un ID en la URL, significa que estamos creando un nuevo usuario, por lo que llamamos al método anadirUsuario. Si hay un ID, significa que estamos editando un usuario existente, por lo que llamamos al método actualizarUsuario.
      console.log('añadir');
      this.anadirUsuario(usuario)
    } else {
      console.log('actualizar');
      this.actualizarUsuario(usuario)
    }
    this.userForm.reset();
    this.router.navigate(['/crud'], {
  
});
  }

  anadirUsuario(usuario:Usuario): void {
    console.log(this.userForm.value);
    this.usuarioService.addUsuario(usuario).subscribe({
      next: (response) => {
        // Mostrar también  snackbar
        this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snack-success']
        });
       
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      }
    });
  }

  actualizarUsuario(usuario: Usuario): void {
     console.log(usuario);
    this.usuarioService.updateUsuario(usuario).subscribe({
      next: (response) => {
        // Mostrar también  snackbar
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snack-success']
        });
      
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    });

  }

  onReset(): void {
    this.userForm.reset();
  }

}



