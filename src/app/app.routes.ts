import { Routes } from '@angular/router';
import { pokemonDetailsResolver } from './resolvers/pokemon-details.resolver';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'poke-details/:id',
    loadComponent: () => import('./poke-details/poke-details.component').then((m) => m.PokemonDetailsComponent),
    resolve: {
      pokemon: pokemonDetailsResolver
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
