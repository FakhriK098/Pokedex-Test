import React from 'react';
import {RootStackParams} from '../navigation.interface';
import PokemonList from '../../module/pokemonList/PokemonList';
import PokemonDetail from '../../module/pokemonDetail/PokemonDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="Home"
        component={PokemonList}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Detail"
        component={PokemonDetail}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
