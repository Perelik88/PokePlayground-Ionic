import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonDetails } from '../interfaces/pokemon-details';

interface EditedPokemonState {
  [id: string]: Partial<PokemonDetails>;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonStateService {
  private editsSubject = new BehaviorSubject<EditedPokemonState>({});
  private edits$ = this.editsSubject.asObservable();

  setEdit(id: string, changes: Partial<PokemonDetails>): void {
    const current = this.editsSubject.value;
    this.editsSubject.next({
      ...current,
      [id]: {
        ...current[id],
        ...changes
      }
    });
  }

  getEdit(id: string): Observable<Partial<PokemonDetails> | undefined> {
    return this.edits$.pipe(
      map(all => all[id])
    );
  }

  getAllEdits(): Observable<EditedPokemonState> {
    return this.edits$;
  }
  
  clearEdit(id: string): void {
    const current = { ...this.editsSubject.value };
    delete current[id];
    this.editsSubject.next(current);
  }

  clearAll(): void {
    this.editsSubject.next({});
  }
}
