// src/app/components/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PartidaService } from '../../services/partida.service';
import { Partida } from '../../models/partida.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  jugadores: any[] = [];
  jugador1: string = '';
  jugador2: string = '';

  constructor(
    private userService: UserService,
    private partidaService: PartidaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any[]) => this.jugadores = res,
      error: err => console.error('Error al obtener jugadores:', err)
    });
  }

  crearPartida(): void {
    if (this.jugador1 && this.jugador2 && this.jugador1 !== this.jugador2) {
      const nuevaPartida: Partida = {
        juego_id: '3d242438-4b61-4958-a53e-c41ffc55a388',
        fecha: new Date().toISOString().split('T')[0],
        jugador1_id: this.jugador1,
        jugador2_id: this.jugador2
      };

      this.partidaService.create(nuevaPartida).subscribe({
        next: (res: Partida) => {
          // Guardar los IDs en localStorage
          localStorage.setItem('jugador1_id', this.jugador1);
          localStorage.setItem('jugador2_id', this.jugador2);

          // Mostrar toda la respuesta del backend como JSON formateado
          alert(`✅ ${JSON.stringify(res, null, 2)}`);

          // Redirigir al componente del juego
          this.router.navigate(['/juego', res.juego_id]);
        },
        error: err => {
          console.error('❌ Error al crear partida:', err.error || err);
          alert('❌ Error al crear la partida:\n' + JSON.stringify(err.error || err));
        }
      });
    } else {
      alert('⚠️ Selecciona dos jugadores diferentes');
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro-jugador']);
  }
}
