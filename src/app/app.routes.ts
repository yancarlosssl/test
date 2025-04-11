import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MemoryGameComponent } from './pages/memory-game/memory-game.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'juego',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MemoryGameComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'juego',
    component: MemoryGameComponent
  }
];
