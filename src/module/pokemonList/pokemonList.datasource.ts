import Axios from 'axios';
import {Pokemon} from './pokemonList.interface';
import {BASE_URL} from '../../config/constant';

export const getPokemonList = async (offset: number) => {
  const resPoke = await Axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
  const result: Pokemon[] = await Promise.all(
    resPoke.data.results.map(async (item): Promise<any> => {
      const pokemon: Pokemon = (await Axios.get(item.url)).data;
      return pokemon;
    }),
  );

  const finalResult = await Promise.all(
    result.map(async (item): Promise<Pokemon> => {
      const b = (await Axios.get(item.species.url)).data;
      return {
        ...item,
        colors: {name: b.color.name},
        evolutionChain: {url: b.evolution_chain.url},
      };
    }),
  );

  if (offset > 0) {
    return {data: finalResult, isLoading: false};
  } else {
    return {data: finalResult, moreLoading: false};
  }
};
