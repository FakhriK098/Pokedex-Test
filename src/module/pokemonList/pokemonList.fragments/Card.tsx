import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Types} from '../pokemonList.interface';
import {color} from '../../../themes';
import Type from './Type';

interface CardProps {
  name: string;
  imageUrl: string;
  types: Types[];
  onPress: () => void;
  colorCard: string;
}

const Card = ({name, imageUrl, types, onPress, colorCard}: CardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <View style={[styles.background, {backgroundColor: colorCard}]} />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.type}>
            {types.map(type => {
              return <Type type={type.type.name} size={'small'} />;
            })}
          </View>
        </View>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 10,
    opacity: 0.6,
  },
  content: {
    borderRadius: 10,
    padding: 20,
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: color.black,
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  type: {
    flexDirection: 'column',
    marginTop: 4,
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  container: {
    flex: 1 / 2,
    margin: 3,
  },
});
