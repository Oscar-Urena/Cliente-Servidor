import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Head } from './components/head/head.js';

@Component({
  selector: 'app-root',
  imports: [Head,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto-VideoJuegos');
}
