import { Component, inject } from '@angular/core';
import { Clientes } from '../../services/clientes';


import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  imports: [MatButtonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  public aClientes = inject(Clientes);
  public router = inject(Router);

  goHome():void{
    this.router.navigateByUrl("/body")
  }
}
