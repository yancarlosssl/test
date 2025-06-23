// src/app/services/acierto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { Acierto } from '../models/acierto.model';

@Injectable({
  providedIn: 'root'
})
export class AciertoService {
  private apiUrl = 'https://apigame.gonzaloandreslucio.com/api/aciertos';

  constructor(private http: HttpClient) {}

  // 🔁 Lógica inteligente: crea o actualiza un acierto
  createOrUpdate(acierto: Acierto): Observable<any> {
    return this.getByUserAndPartida(acierto.user_id, acierto.partida_id).pipe(
      switchMap((existente: any) => {
        if (existente && existente.id) {
          // Ya existe: actualiza los aciertos sumando 1
          const actualizado = { ...existente, aciertos: existente.aciertos + 1 };
          return this.update(existente.id, actualizado);
        } else {
          // No existe: crea uno nuevo
          return this.create(acierto);
        }
      })
    );
  }

  // ✅ Crear nuevo
  create(acierto: Acierto): Observable<Acierto> {
    return this.http.post<Acierto>(this.apiUrl, acierto);
  }

  // 🔁 Actualizar por ID
  update(id: number, acierto: Acierto): Observable<Acierto> {
    return this.http.put<Acierto>(`${this.apiUrl}/${id}`, acierto);
  }

  // 🔍 Obtener acierto por user y partida
  getByUserAndPartida(user_id: number, partida_id: number): Observable<Acierto | null> {
    const url = `${this.apiUrl}/usuario/${user_id}/partida/${partida_id}`;
    return this.http.get<Acierto>(url);
  }
}
