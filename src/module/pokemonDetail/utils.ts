import {BASE_URL_IMAGE, POKEMON_FAVORITE} from '../../config/constant';
import {persistance} from '../../libraries';
import {AddToAsyncStorageProps} from './pokemonDetail.interface';

export const createImgLink = (id: number, url?: string): string => {
  let imgUrl: string = '';
  if (id > 0) {
    imgUrl = `${BASE_URL_IMAGE}${id}.png`;
  } else {
    const urlSplit = url?.split('/');
    if (urlSplit) {
      const idUrl = urlSplit[urlSplit?.length - 2];
      imgUrl = `${BASE_URL_IMAGE}${idUrl}.png`;
    }
  }

  return imgUrl;
};

export const addToAsyncStorage = ({
  id,
  pokemonFavorite,
  setPokemonFavorite,
}: AddToAsyncStorageProps) => {
  if (pokemonFavorite) {
    if (!pokemonFavorite.find(item => item === id)) {
      try {
        persistance.setObject(POKEMON_FAVORITE, pokemonFavorite.concat(id));
      } catch (e) {
        return null;
      }
      setPokemonFavorite(pokemonFavorite.concat(id));
    }
  } else {
    try {
      persistance.setObject(POKEMON_FAVORITE, [id]);
    } catch (e) {
      return null;
    }
    setPokemonFavorite([id]);
  }
};

export const removeFromAsyncStorage = ({
  id,
  pokemonFavorite,
  setPokemonFavorite,
}: AddToAsyncStorageProps) => {
  const newData = pokemonFavorite.filter(item => item !== id);
  setPokemonFavorite(newData);
  persistance.setObject(POKEMON_FAVORITE, newData);
};

export const isFavorite = (id: number, pokemonFavorite: number[]): boolean => {
  if (!pokemonFavorite) {
    return false;
  }
  return Boolean(pokemonFavorite.find(item => item === id));
};
