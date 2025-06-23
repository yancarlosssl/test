import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private apiUrl = 'https://apigame.gonzaloandreslucio.com/api/partidas'; // Ajusta si tu URL cambia

  constructor(private http: HttpClient) {}

  // ✅ Crear una nueva partida
  create(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(this.apiUrl, partida);
  }

  // ✅ Obtener una partida por su juego_id
  getPartida(juego_id: string): Observable<Partida> {
    return this.http.get<Partida>(`${this.apiUrl}/${juego_id}`);
  }

  // ✅ Obtener todas las partidas (opcional)
  getAll(): Observable<Partida[]> {
    return this.http.get<Partida[]>(this.apiUrl);
  }
}
