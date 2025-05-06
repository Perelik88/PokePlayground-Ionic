import { Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

export const pokemonDetailsResolver: ResolveFn<any> = (route) => {
  const id = route.paramMap.get('id')!;
  const service = inject(PokemonService);
  return service.getPokemonDetails(id);
};
