// store/pokemon.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setPokemonEdit, clearPokemonEdit } from '../actions/poke.actions';
import { PokemonDetails } from 'src/app/interfaces/pokemon-details';

export interface PokemonEditsState {
  [id: string]: Partial<PokemonDetails>;
}

export const initialState: PokemonEditsState = {};

export interface PokemonEditState {
    [id: string]: Partial<PokemonDetails>;
}

export const pokemonEditsReducer = createReducer(
  initialState,
  on(setPokemonEdit, (state, { id, changes }) => ({
    ...state,
    [id]: { ...state[id], ...changes }
  })),
  on(clearPokemonEdit, (state, { id }) => {
    const { [id]: removed, ...rest } = state;
    return rest;
  })
);
