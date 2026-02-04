import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Head } from "./components/head/head";
import { Body } from "./components/body/body";
import { Footer } from "./components/footer/footer";
import { Iforcom } from './components/iforcom/iforcom';
import { Switchcom } from './components/switchcom/switchcom';
import { NStyleC } from './components/ng-style-c/ng-style-c';
import { NgClassC } from './components/ng-class-c/ng-class-c';
import { Doblebinding } from './components/doblebinding/doblebinding';
import { Pipes } from './components/pipes/pipes';
import { SignalC } from './components/signal-c/signal-c';
import { Padre } from './components/padre/padre';




@Component({
  selector: 'app-root',
  imports: [Head, Footer, Padre],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primerAngular');
}
