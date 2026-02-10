import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  public frmDatos: FormGroup;

  constructor(private frmBuilder: FormBuilder){
    this.frmDatos = frmBuilder.group({
      nomApe:[
        "",
        [Validators.required]
      ],
      email:["", [Validators.required]],
      pssw:[
        "",
        [Validators.required]
      ]
    })
  }
}
