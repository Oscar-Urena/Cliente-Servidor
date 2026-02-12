import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioServices } from '../../../services/usuarios';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatIconModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public loginFrm: FormGroup
  private usuarioService = inject(UsuarioServices);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {

    this.loginFrm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]

    });
  }

  /**getter's */

  get email() {
    return this.loginFrm.get('email') as FormControl; 
  }
  get password() {
    return this.loginFrm.get('password') as FormControl; 
  }

  onLogin(): void {

    //llamar al servicio de autenticación para verificar las credenciales del usuario

    //Preparar el objeto usuario con los datos del formulario
    const usuario: Usuario = {
      email: this.email.value,
      password: this.password.value,
      
    };
    // llamar al servicio de autenticación para verificar las credenciales del usuario
    this.usuarioService.login(usuario).subscribe({
      next: (response) => {
            
        // Redirigir al usuario a la página principal o a otra página después del login exitoso 
        this.router.navigate(['/crud']);
      },
      error: (error) => {
        // Error en el login
        console.error('Error en login:', error);

        // Mostrar también  snackbar
        this.snackBar.open(error.message, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snack-error'] 
        });
      }
    });
  }



}
