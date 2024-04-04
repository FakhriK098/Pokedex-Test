import {selectorFamily, atom} from 'recoil';
import {
  Evolution,
  Evolves,
  Pokemon,
} from '../pokemonList/pokemonList.interface';
import {aPokemonListState} from '../pokemonList/pokemonList.model';
import {createImgLink} from './utils';

interface PokemonDetail {
  pokemon: Pokemon;
  evolution: Evolution[];
  isFavorite: boolean;
}

export const sfPokemonDetail = selectorFamily<PokemonDetail | null, number>({
  key: 'sfEvolutionChain',
  get:
    id =>
    ({get}) => {
      const pokemonList = get(aPokemonListState).data;
      const evolutionResult: Evolution[] = [];
      let hasEvolution = true;
      let isFavorite = false;

      const pokemon = pokemonList.find(item => item.id === id);

      if (pokemon) {
        if (pokemon.chain) {
          hasEvolution = pokemon.chain.evolves_to.length > 0;
          let evolve: Evolves = pokemon.chain;
          while (hasEvolution) {
            const evol: Evolution = {
              evolutionFrom: evolve.species.name,
              level: evolve.evolves_to[0].evolution_details[0].min_level,
              evolutionTo: evolve.evolves_to[0].species.name,
              evolutionImgFrom: createImgLink(0, evolve.species.url),
              evolutionImgTo: createImgLink(
                0,
                evolve.evolves_to[0].species.url,
              ),
            };

            evolutionResult.push(evol);
            hasEvolution = evolve.evolves_to[0].evolves_to.length > 0;
            evolve = evolve.evolves_to[0];
          }
        }

        return {
          pokemon: pokemon,
          evolution: evolutionResult,
          isFavorite: isFavorite,
        };
      }

      return null;
    },
});

export const aPokemonFavorites = atom<number[]>({
  key: 'aPokemonFavorites',
  default: [],
});
