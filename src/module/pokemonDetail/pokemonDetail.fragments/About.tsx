import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextValue} from '../../../components';
import {color} from '../../../themes';
import {Pokemon} from '../../pokemonList/pokemonList.interface';

const About = ({pokemon}: {pokemon: Pokemon}) => {
  const abilities = pokemon.abilities.map(item => {
    return item.ability.name;
  });

  const sprites = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
  ];
  return (
    <View style={styles.page}>
      <Text style={styles.titleAbout}>About</Text>
      <TextValue label={'Height'} value={pokemon.height} />
      <TextValue label={'Weight'} value={pokemon.weight} />
      <TextValue label={'Abilities'} value={abilities.join(', ')} />
      <Text style={styles.title}>Sprites</Text>
      <View style={styles.contentSprites}>
        {sprites.map((item, index) => {
          return (
            <Image source={{uri: item}} style={styles.image} key={index} />
          );
        })}
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    color: color.black,
    fontSize: 18,
    fontWeight: '600',
  },
  contentSprites: {
    borderColor: color.grey_8D92A3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    marginEnd: 10,
  },
  titleAbout: {
    fontSize: 24,
    color: color.black,
    marginBottom: 7,
  },
});
