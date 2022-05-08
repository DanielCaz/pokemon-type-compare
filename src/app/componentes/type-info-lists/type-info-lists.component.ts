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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getData() {
    this.pokemonTypeData = this.initData();

    this.http
      .get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`
      )
      .subscribe((pokemonData) => {
        this.http
          .get<PokemonType>(pokemonData.types[0].type.url)
          .subscribe((typeData) => {
            typeData.damage_relations.double_damage_from.forEach((item) => {
              this.pokemonTypeData.damage_relations.double_damage_from.push(
                item
              );
            });
            typeData.damage_relations.double_damage_to.forEach((item) => {
              this.pokemonTypeData.damage_relations.double_damage_to.push(item);
            });
            typeData.damage_relations.half_damage_from.forEach((item) => {
              this.pokemonTypeData.damage_relations.half_damage_from.push(item);
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
      });
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
    };
  }
}
