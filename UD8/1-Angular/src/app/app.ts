import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Head } from "./components/head/head";

import { Footer } from "./components/footer/footer";




@Component({
  selector: 'app-root',
  imports: [Head, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primerAngular');
}
