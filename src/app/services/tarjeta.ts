// src/app/services/tarjeta.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

// ⚠️ VERIFICAR: Usa el puerto HTTPS correcto de tu backend (44354)
const API_URL = 'https://localhost:44354/api/Tarjeta'; 

// Definimos la interfaz para asegurar el tipado
export interface TarjetaCredito {
  id?: number; // El ID es opcional en el POST
  titular: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvv: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private http: HttpClient) { }

  // Método GET para obtener todas las tarjetas
  obtenerTarjetas(): Observable<TarjetaCredito[]> {
    return this.http.get<TarjetaCredito[]>(API_URL);
  }

  // Método POST para guardar una tarjeta
  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(API_URL, tarjeta);
  }

  // Método PUT para actualizar una tarjeta
  actualizarTarjeta(id: number, tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.put<TarjetaCredito>(`${API_URL}/${id}`, tarjeta);
  }

  // Método DELETE para eliminar una tarjeta
  eliminarTarjeta(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}