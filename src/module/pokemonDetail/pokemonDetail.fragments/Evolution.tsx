import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../../../themes';
import {Evolution as EvolutionProps} from '../../pokemonList/pokemonList.interface';
import EvolutionChain from './EvolutionChain';

const Evolution = ({evolution}: {evolution: EvolutionProps[]}) => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Evolution Chain</Text>
      <View style={styles.content}>
        {evolution.map((item, index) => {
          return (
            <EvolutionChain
              key={`${item.evolutionFrom}-${index}`}
              evolutionFrom={{
                name: item.evolutionFrom,
                image: item.evolutionImgFrom,
              }}
              evolutionTo={{
                name: item.evolutionTo,
                image: item.evolutionImgTo,
              }}
              level={item.level}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Evolution;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    color: color.black,
    fontSize: 24,
  },
  content: {
    marginTop: 10,
  },
});
