import { Component, signal } from '@angular/core';
import { TarjetaCredito } from './components/tarjeta-credito/tarjeta-credito';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaCredito, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('FETarjetaCredito');
}

