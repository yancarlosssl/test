import { Routes } from '@angular/router';
import { MemoryGameComponent } from './pages/memory-game/memory-game.component';
import { RegistroJugadorComponent } from './components/registro-jugador/registro-jugador.component'; // 👈 importa el componente
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'registro-jugador',
    component: RegistroJugadorComponent
  },
  {
 
  path: 'juego/:id',
  component: MemoryGameComponent
},
 
  {
    path: 'inicio', 
    
    component: InicioComponent

  }
];
