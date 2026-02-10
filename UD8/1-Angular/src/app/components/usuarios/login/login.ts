import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public loginFrm: FormGroup;

  constructor(private frmBuilder: FormBuilder) {
    this.loginFrm = frmBuilder.group({
      email: [
        "", 
        [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(50)]
      ]
    })
  }

  submit():void{
    console.log("Pulsado el boton submit");
  }
}
