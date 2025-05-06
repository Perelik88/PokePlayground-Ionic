import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    private httpClient = inject(HttpClient);
    private apiUrl = 'https://pokeapi.co/api/v2/';
    private limit = 10;

    constructor(private http: HttpClient) {}

    getPokemonList(): Observable<any> {
        return this.httpClient.get(this.apiUrl+'pokemon?limit='+this.limit);
    }

    getPokemonDetails(id: string): Observable<any> {
        return this.httpClient.get(`${this.apiUrl}pokemon/${id}`);
    }
}