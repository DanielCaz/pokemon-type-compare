import { Component, OnInit } from '@angular/core';
import { PokemonType } from '../../pokemon-type';
import { Pokemon } from '../../pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-type-info-lists',
  templateUrl: './type-info-lists.component.html',
  styleUrls: ['./type-info-lists.component.scss'],
})
export class TypeInfoListsComponent implements OnInit {
  pokemonData!: Pokemon;
  typeData: PokemonType[] = [];
  pokemonName!: string;
  pokemonNotFound = false;
  loading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  getData() {
    if (!this.pokemonName || this.pokemonName.split(' ').join('').length === 0)
      return;

    this.resetData();
    this.loading = true;

    this.pokemonName = this.pokemonName.trim();

    this.pokemonService.getPokemon(this.pokemonName.toLowerCase()).subscribe({
      next: (pokemonResponse) => {
        this.pokemonData = pokemonResponse;
        pokemonResponse.types.forEach((typeObj) => {
          setTimeout(() => {
            this.pokemonService.getType(typeObj.type.name).subscribe({
              next: (typeResponse) => {
                this.typeData.push(typeResponse);
                this.loading = false;
              },
            });
          }, 1000); // prevent spam to API
        });
      },
      error: () => {
        this.pokemonNotFound = true;
      },
    });
  }

  resetData() {
    this.pokemonNotFound = false;
    this.typeData = [];
  }
}
