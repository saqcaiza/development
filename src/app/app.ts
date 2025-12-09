import { Component, signal } from '@angular/core';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaCreditoComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('FETarjetaCredito');
}

