// src/app/components/tarjeta-credito/tarjeta-credito.component.ts

import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

// ⚠️ RUTA CORREGIDA: Asumo que el servicio está en '../services/'
import { TarjetaService, TarjetaCredito } from '../../services/tarjeta'; 


// La interfaz TarjetaCredito ahora se importa desde el servicio


@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  // ReactiveFormsModule es necesario para [formGroup] en el HTML
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  form: FormGroup;
  listTarjetas: any[] = [];
  editandoId: number | null = null;
  
  // CONSTRUCTOR: Inyectamos solo las dependencias necesarias.
  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private tarjetaService: TarjetaService // Inyección del servicio
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    // Cargar las tarjetas desde la API
    this.cargarTarjetas();
  }

  // Cargar tarjetas desde la API
  cargarTarjetas(): void {
    this.tarjetaService.obtenerTarjetas().subscribe({
      next: (tarjetas: TarjetaCredito[]) => {
        this.listTarjetas = tarjetas;
      },
      error: (err: any) => {
        console.error('Error al cargar tarjetas:', err);
        this.toastr.error('Error al cargar las tarjetas.', 'Error');
      }
    });
  }

  // FUNCIÓN DE ENVÍO: Agregar o actualizar tarjeta
  agregarTarjeta() {
    if (this.form.invalid) {
      this.toastr.error("El formulario no es válido. Revise los campos.", "Error de Validación");
      return;
    }

    const tarjetaData: TarjetaCredito = this.form.value;

    if (this.editandoId) {
      // Actualizar tarjeta existente
      this.tarjetaService.actualizarTarjeta(this.editandoId, tarjetaData).subscribe({
        next: (response: TarjetaCredito) => {
          this.toastr.success('¡La tarjeta fue actualizada con éxito!', 'Tarjeta Actualizada');
          this.form.reset();
          this.editandoId = null;
          this.cargarTarjetas();
        },
        error: (err: any) => {
          console.error('Error al actualizar la tarjeta:', err);
          this.toastr.error('Error al intentar actualizar la tarjeta.', 'Error de Conexión');
        }
      });
    } else {
      // Guardar tarjeta nueva
      this.tarjetaService.guardarTarjeta(tarjetaData).subscribe({
        next: (response: TarjetaCredito) => {
          this.toastr.success('¡La tarjeta fue guardada con éxito!', 'Tarjeta Registrada');
          this.form.reset();
          this.cargarTarjetas();
        },
        error: (err: any) => {
          console.error('Error al guardar la tarjeta:', err);
          this.toastr.error('Error al intentar guardar la tarjeta.', 'Error de Conexión');
        }
      });
    }
  }

  // Funcionalidad de editar
  editarTarjeta(tarjeta: TarjetaCredito) {
    if (!tarjeta.id) {
      this.toastr.error('Error: la tarjeta no tiene ID', 'Error');
      return;
    }
    this.editandoId = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
    // Scroll hacia el formulario
    window.scrollTo(0, 0);
  }

  // Funcionalidad de eliminar
  eliminarTarjeta(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta tarjeta?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe({
        next: () => {
          this.toastr.success('¡La tarjeta fue eliminada con éxito!', 'Tarjeta Eliminada');
          this.cargarTarjetas();
        },
        error: (err: any) => {
          console.error('Error al eliminar la tarjeta:', err);
          this.toastr.error('Error al intentar eliminar la tarjeta.', 'Error de Conexión');
        }
      });
    }
  }

  // Cancelar edición
  cancelarEdicion() {
    this.form.reset();
    this.editandoId = null;
  }
}