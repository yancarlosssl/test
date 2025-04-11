import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-memory-game',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.sass']
  
})
export class MemoryGameComponent implements OnInit {

  icons: string[] = ['🐻', '🐴', '📞', '🍇', '🚗', '🌂', '🎈', '🐬'];
  cards: any[] = [];
  selectedCards: any[] = [];
  currentPlayer: number = 1;
  scores: number[] = [0, 0];
  blocked: boolean = false;

  ngOnInit(): void {
    this.initializeCards();
  }

  initializeCards() {
    const duplicated = [...this.icons, ...this.icons]; // duplicar para pares
    this.cards = duplicated
      .map(icon => ({ icon, state: 'hidden' }))
      .sort(() => Math.random() - 0.5); // mezclar
  }

  selectCard(card: any) {
    if (card.state !== 'hidden' || this.blocked) return;

    card.state = 'visible';
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.blocked = true;

      setTimeout(() => {
        const [first, second] = this.selectedCards;

        if (first.icon === second.icon) {
          first.state = second.state = 'matched';
          this.scores[this.currentPlayer - 1]++;
        } else {
          first.state = second.state = 'hidden';
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }

        this.selectedCards = [];
        this.blocked = false;
      }, 1000);
    }
  }
}