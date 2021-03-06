import {Injectable, OnInit} from '@angular/core';
import {Pokemon} from './pokemons';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DamageInfo} from './damageInfo';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';
  pokeApiTypeURL = 'https://pokeapi.co/api/v2/type/';

  constructor(private http: HttpClient) {
  }

  public getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(this.pokeApiURL + '?offset=' + offset + '&limit=' + limit);
  }

  public getPokemonDetails(pokemon: any): Observable<any> {
    return this.http.get<any>(pokemon.url).pipe(map(data => {
        return Pokemon.fromObject(data);
      }
    ));
  }

  public getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(this.pokeApiURL + name).pipe(map(data => {
      return Pokemon.fromObject(data);
    }));
  }

  public getPokemonsByType(type: string): Observable<any> {
    return this.http.get<any>(this.pokeApiTypeURL + type).pipe(map(data => data.pokemon.map(item => ({name: item.pokemon.name, url: item.pokemon.url}))));
  }
   public getDamageInfo(types: string) {
     // The split() method turns a String into an array of strings, by separating the string at each instance of a specified separator string.
    const arr = types.split(', ');
    return arr.map((item: string) => this.http.get<any>(this.pokeApiTypeURL + item).pipe((map(data => DamageInfo.fromObject(data)))));
   }


}
