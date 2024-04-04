import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, images} from '../../themes';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Image source={images.emptyPokemon} style={styles.image} />
      <Text style={styles.text}>Sorry, Data not found</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 18,
    color: color.black,
    marginTop: 12,
    textAlign: 'center',
  },
});
