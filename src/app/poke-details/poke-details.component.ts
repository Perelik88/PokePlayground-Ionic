import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput, IonItem, IonLabel, IonToolbar, IonButtons, IonIcon, IonTitle } from "@ionic/angular/standalone";
import { NavController } from '@ionic/angular';
import { PokemonStateService } from '../services/pokemon-state.service';
import { PokemonDetails } from '../interfaces/pokemon-details';
import { FormsModule } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { clearPokemonEdit, setPokemonEdit } from '../store/actions/poke.actions';
import { selectEditedPokemonById } from '../store/selectors/poke.selectors';
import { NavigationService } from '../services/navigation.service';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

addIcons({
  'arrow-back': arrowBack,
});

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
  imports: [IonTitle, IonIcon, IonButtons, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonCardHeader, IonCardTitle, IonCard, IonCardContent, NgFor, FormsModule, NgIf, AsyncPipe],
})

export class PokemonDetailsComponent {
  // pokemon!: PokemonDetails;
  // editedPokemon!: Partial<PokemonDetails>;
  // editMode = false;
  // private state = inject(PokemonStateService);
  private navigationService = inject(NavigationService);
  private navCtrl = inject(NavController);
  private router = inject(Router);
  pokemonId: string;
  isEditing = false;

  pokemon$: Observable<PokemonDetails>;
  editedPokemon$: Observable<Partial<PokemonDetails>>;
  viewModel$: Observable<PokemonDetails>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.pokemon$ = this.route.data.pipe(map(data => data['pokemon']));
    this.pokemonId = this.route.snapshot.paramMap.get('id')!;
    this.editedPokemon$ = this.store.select(selectEditedPokemonById(this.pokemonId));
    // Combine the original and edited Pokemon data into a single observable
    this.viewModel$ = combineLatest([
      this.pokemon$,
      this.editedPokemon$
    ]).pipe(
      map(([original, edited]) => ({
        ...original,
        ...edited
      }))
    );
  }
  // Not working with behaviorSubjects since Resolver is used
  // ngOnInit() {
  //   this.pokemon = this.route.snapshot.data['pokemon'];

  //   this.state.getEdit(this.pokemon.id.toString()).subscribe(edit => {
  //     this.editedPokemon = edit
  //       ? { ...this.pokemon, ...edit }
  //       : { ...this.pokemon };
  //   });
  // }
  
  startEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.store.dispatch(clearPokemonEdit({ id: this.pokemonId }));
  }

  saveEdit() {
    this.isEditing = false;
  
  }

  onFieldChange(field: keyof PokemonDetails, value: any) {
    const numericFields = ['height', 'weight', 'base_experience'];
    const castValue = numericFields.includes(field) ? +value : value;

    this.store.dispatch(setPokemonEdit({
      id: this.pokemonId,
      changes: { [field]: castValue }
    }));
  }

  goBack() {
    const prevUrl = this.navigationService.getPreviousUrl();
    if (prevUrl) {
      this.router.navigateByUrl(prevUrl);
    } else {
      this.navCtrl.back();
    }
  }

   // Not working with behaviorSubjects since Resolver is used
  // startEdit() {
  //   this.editMode = true;
  // }

  // saveEdit() {
  //   // Push only the changed fields into the BehaviorSubject
  //   this.state.setEdit(
  //     this.pokemon.id.toString(),
  //     this.editedPokemon
  //   );
  //   // Reflect edits in the UI model
  //   this.pokemon = { ...this.pokemon, ...this.editedPokemon } as any;
  //   this.editMode = false;
  // }

  // cancelEdit() {
  //   // Reset the buffer back to the last saved state
  //   this.editedPokemon = { ...this.pokemon };
  //   this.editMode = false;
  // }
}