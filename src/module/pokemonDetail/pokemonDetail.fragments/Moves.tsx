import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Type from '../../pokemonList/pokemonList.fragments/Type';
import {Pokemon} from '../../pokemonList/pokemonList.interface';
import {color} from '../../../themes';

const Moves = ({pokemon}: {pokemon: Pokemon}) => {
  const moves = pokemon.moves.slice(0, 10);

  return (
    <>
      <Text style={styles.title}>Moves</Text>
      <View style={styles.type}>
        {moves.map((item, index) => {
          return (
            <Type
              key={`${item.move.name}-${index}`}
              type={item.move.name}
              size={'medium'}
            />
          );
        })}
      </View>
    </>
  );
};

export default Moves;

const styles = StyleSheet.create({
  type: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
    flexWrap: 'wrap',
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: color.black,
    marginStart: 10,
  },
});
