import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.html',
  styleUrls: ['./tarjeta-credito.css'],
})
export class TarjetaCredito implements OnInit {

  form: FormGroup;
  listTarjetas: any[] = [
    { titular: 'juan perez', numeroTarjeta: '5656565656', fechaExpiracion: '11/12', cvv: '123' },
    { titular: 'waaaaa', numeroTarjeta: '62656262626', fechaExpiracion: '11/11', cvv: '321' }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }
  ngOnInit(): void { }

  agregarTarjeta() {
    if (this.form.invalid) return;

    const tarjeta = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };

    this.listTarjetas.push(tarjeta);
    this.toastr.success('Formulario enviado con éxito', 'Tarjeta Registrada');
    this.form.reset();
  }

  eliminarTarjeta(index: number) {
    this.listTarjetas.splice(index, 1);
    this.cdr.detectChanges();
    this.toastr.error('La tarjeta fue eliminada con exito', 'tarjeta eliminada')
  }
}
