import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego';
import { error } from 'console';

@Component({
  selector: 'app-formularios',
  imports: [ReactiveFormsModule],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css',
})
export class Formularios implements OnInit {

  juegoForm: FormGroup;
  currentYear = new Date().getFullYear();
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private juegoService: JuegoService
  ) {
    this.juegoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      titulo: ['', [Validators.required, Validators.maxLength(150)]],
      desarrollador: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      anio: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.max(9999.99)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      estado: ['Disponible', [Validators.required]],
      imagen: ['', [Validators.pattern("/^https:\/\//.*")]]
    });
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicion = true;
      this.juegoService.getJuego(id).subscribe((juego: any) => {
        console.log(juego);
        this.juegoForm.patchValue(juego.data);
      });
    }
  }

  onSubmit(): void {
    if (this.juegoForm.invalid) {  // ← estaba al revés
      this.juegoForm.markAllAsTouched();
      return;
    }

    const juegoData = this.juegoForm.getRawValue();
    const id = juegoData.id;

    if (id) {
      // Modo edición
      this.juegoService.updateJuego(id, juegoData).subscribe({
        next: () => {
          alert('Juego actualizado correctamente');
          this.router.navigate(['/juegos']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      // Modo creación
      this.juegoService.addJuego(juegoData).subscribe({  // ← addCurso → addJuego
        next: () => {
          alert('Juego guardado correctamente');
          this.router.navigate(['/juegos']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.juegoForm.reset();
  }

}