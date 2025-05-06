import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons, IonButton, IonIcon, IonContent, IonItem, IonList, IonCardTitle, IonCard, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { UrlIdExtractorService } from '../services/url-id-extractor.service';
import { addIcons } from 'ionicons';
import { menu, addCircleOutline } from 'ionicons/icons';

addIcons({
  'menu': menu,
  'add-circle-outline': addCircleOutline
});
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonContent, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle,]
})
export class HomePage {
  private pokeService = inject(PokemonService);
  public pokemonList: any[] = [];
  private router = inject(Router);
  private urlIdExtractor = inject(UrlIdExtractorService)
  private openedMenu: boolean = false;

  openMenu(): void {
    if (!this.openedMenu) {
      console.log('Menu opened');
      this.pokeService.getPokemonList().subscribe((data: any) => {
        this.pokemonList = data.results;
        console.log(this.pokemonList);
      });
    } else {
      console.log('Menu closed');
      this.pokemonList = [];
    }
    this.openedMenu = !this.openedMenu;
  }

  openDetails(pokemonUrl: string): void {
    const pokemonId = this.urlIdExtractor.getIdFromUrl(pokemonUrl, 'pokemon');
    this.router.navigate(['/poke-details', pokemonId]);
  }
}
