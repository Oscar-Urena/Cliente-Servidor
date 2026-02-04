import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-doblebinding',
  imports: [NgStyle, FormsModule],
  templateUrl: './doblebinding.html',
  styles: ``,
})
export class Doblebinding {
  public miColor:string="brown"
}
