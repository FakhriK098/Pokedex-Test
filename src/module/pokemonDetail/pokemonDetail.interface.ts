import {SetterOrUpdater} from 'recoil';

export type ChainType = {
  name: string;
  image: string;
};

export type EvolutionChainProps = {
  evolutionFrom: ChainType;
  evolutionTo: ChainType;
  level: string | number;
};

export interface AddToAsyncStorageProps {
  id: number;
  pokemonFavorite: number[];
  setPokemonFavorite: SetterOrUpdater<number[]>;
}
