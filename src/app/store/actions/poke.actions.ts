import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../../interfaces/pokemon-details';

export const setPokemonEdit = createAction(
  '[Pokemon] Set Edit',
  props<{ id: string; changes: Partial<PokemonDetails> }>()
);

export const clearPokemonEdit = createAction(
  '[Pokemon] Clear Edit',
  props<{ id: string }>()
);