import { Component, OnInit } from '@angular/core';
import { PokemonType } from '../../pokemon-type';
import { Pokemon } from '../../pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-type-info-lists',
  templateUrl: './type-info-lists.component.html',
  styleUrls: ['./type-info-lists.component.scss'],
})
export class TypeInfoListsComponent implements OnInit {
  pokemonTypeData: PokemonType = this.initData();
  pokemonName!: string;
  pokemonTypes: { name: string }[] = [];
  pokemonNotFound = false;

  apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getData() {
    if (!this.pokemonName || this.pokemonName.split(' ').join('').length === 0)
      return;

    this.resetData();

    this.pokemonName = this.pokemonName.trim();

    this.http
      .get<Pokemon>(`${this.apiUrl}pokemon/${this.pokemonName.toLowerCase()}`)
      .subscribe(
        (pokemonData) => {
          pokemonData.types.forEach((type) => {
            this.pokemonTypes.push({ name: type.type.name });
          });
          this.http
            .get<PokemonType>(pokemonData.types[0].type.url)
            .subscribe((typeData) => {
              typeData.damage_relations.double_damage_from.forEach((item) => {
                this.pokemonTypeData.damage_relations.double_damage_from.push(
                  item
                );
              });
              typeData.damage_relations.double_damage_to.forEach((item) => {
                this.pokemonTypeData.damage_relations.double_damage_to.push(
                  item
                );
              });
              typeData.damage_relations.half_damage_from.forEach((item) => {
                this.pokemonTypeData.damage_relations.half_damage_from.push(
                  item
                );
              });
              typeData.damage_relations.half_damage_to.forEach((item) => {
                this.pokemonTypeData.damage_relations.half_damage_to.push(item);
              });
              typeData.damage_relations.no_damage_from.forEach((item) => {
                this.pokemonTypeData.damage_relations.no_damage_from.push(item);
              });
              typeData.damage_relations.no_damage_to.forEach((item) => {
                this.pokemonTypeData.damage_relations.no_damage_to.push(item);
              });
            });
        },
        () => {
          this.pokemonNotFound = true;
        }
      );
  }

  initData() {
    return {
      damage_relations: {
        double_damage_from: [],
        double_damage_to: [],
        half_damage_from: [],
        half_damage_to: [],
        no_damage_from: [],
        no_damage_to: [],
      },
      pokemon: [],
    };
  }

  resetData() {
    this.pokemonTypeData = this.initData();
    this.pokemonTypes = [];
    this.pokemonNotFound = false;
  }
}
