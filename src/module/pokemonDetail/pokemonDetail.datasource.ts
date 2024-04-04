import Axios from 'axios';

export const getPokemon = async (url: string) => {
  const response = await Axios.get(url);
  return response;
};
