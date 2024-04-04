import {atom} from 'recoil';
import {Pokemon} from './pokemonList.interface';

interface Result {
  data: Pokemon[];
  isLoading?: boolean;
  moreLoading?: boolean;
}

export const aPokemonListState = atom<Result>({
  key: 'aPokemonListState',
  default: {
    data: [],
    isLoading: false,
    moreLoading: false,
  },
});
