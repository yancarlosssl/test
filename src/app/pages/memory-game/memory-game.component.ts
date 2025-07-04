// src/app/pages/memory-game/memory-game.component.ts

import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PartidaService } from '../../services/partida.service';
import { AciertoService } from '../../services/acierto.service';
import { Acierto } from '../../models/acierto.model';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.sass']
})
export class MemoryGameComponent implements OnInit {
  icons: string[] = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'];
  cards: any[] = [];
  selectedCards: any[] = [];
  currentPlayer = 1;
  scores: number[] = [0, 0];
  blocked: boolean = false;

  jugador1_id: string = '';
  jugador2_id: string = '';
  @Input('id') partida_id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partidaService: PartidaService,
    private aciertoService: AciertoService
  ) {}

  ngOnInit(): void {

    console.log(this.partida_id);
    this.jugador1_id = localStorage.getItem('jugador1_id') || '';
    this.jugador2_id = localStorage.getItem('jugador2_id') || '';

    if (!this.jugador1_id || !this.jugador2_id) {
      console.error('❌ Jugadores no encontrados en localStorage');
      this.router.navigate(['/']);
      return;
    }

    this.initializeCards();
  }

  initializeCards(): void {
    this.cards = this.icons.concat(this.icons)
      .map(icon => ({ icon, revealed: false, matched: false }))
      .sort(() => Math.random() - 0.5);
  }

  selectCard(card: any): void {
    if (this.blocked || card.revealed || card.matched) return;

    card.revealed = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.blocked = true;

      setTimeout(() => {
        const [card1, card2] = this.selectedCards;

        if (card1.icon === card2.icon) {
          card1.matched = true;
          card2.matched = true;
          this.scores[this.currentPlayer - 1]++;
          this.registrarAcierto();
        } else {
          card1.revealed = false;
          card2.revealed = false;
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }

        this.selectedCards = [];
        this.blocked = false;

        if (this.cards.every(c => c.matched)) {
          this.juegoTerminado();
        }
      }, 1000);
    }
  }

registrarAcierto(): void {
  const jugadorActual = this.currentPlayer === 1 ? this.jugador1_id : this.jugador2_id;

  const userIdNumber = Number(jugadorActual);
  const partidaIdNumber = Number(this.partida_id);

  if (isNaN(userIdNumber) || isNaN(partidaIdNumber)) {
    console.error('❌ user_id o partida_id no son válidos:', {
      user_id: jugadorActual,
      partida_id: this.partida_id
    });
    return;
  }

  }

  juegoTerminado(): void {
    console.log('🎉 Juego terminado');
    if (this.scores[0] > this.scores[1]) {
      alert('¡Ganó el Jugador 1! 🎉');
    } else if (this.scores[1] > this.scores[0]) {
      alert('¡Ganó el Jugador 2! 🎉');
    } else {
      alert('¡Empate! 🤝');
    }

    this.guardarAcierto(Number(this.jugador1_id), this.scores[0]);
    this.guardarAcierto(Number(this.jugador2_id), this.scores[1]);
    this.router.navigate(['/']);
  }

  guardarAcierto(user_id: number, aciertos: number): void {
    const nuevoAcierto = {
    user_id: user_id,
    partida_id: Number(this.partida_id),
    aciertos: aciertos,
    tiempo: 0 // Aquí podrías agregar lógica para calcular el tiempo si es necesario
    };

    this.aciertoService.create(nuevoAcierto).subscribe({
      next: (res) => {
        console.log('✅ Acierto registrado:', res);
      },
      error: (err) => {
        console.error('❌ Error al registrar acierto:', err.error || err.message);
        }
      });
    }
}
