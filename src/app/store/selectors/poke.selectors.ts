import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonEditState } from '../reducers/poke.reducer';

export const selectPokemonEditsState = createFeatureSelector<PokemonEditState>('pokemonEdits');

export const selectEditedPokemonById = (id: string) =>
  createSelector(
    selectPokemonEditsState,
    (edits) => edits[id] || {}
  );
