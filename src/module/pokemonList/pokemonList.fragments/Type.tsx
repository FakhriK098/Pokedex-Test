import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../../themes';

interface TypeProps {
  type: string;
  size: 'small' | 'medium' | 'large';
}

const Type = ({type, size}: TypeProps) => {
  const fontSize = () => {
    switch (size) {
      case 'small': {
        return 12;
      }
      case 'medium': {
        return 14;
      }
      case 'large': {
        return 16;
      }
      default: {
        return 12;
      }
    }
  };
  return (
    <View style={styles.containter}>
      <Text style={[styles.title, {fontSize: fontSize()}]}>{type}</Text>
    </View>
  );
};

export default Type;

const styles = StyleSheet.create({
  containter: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignSelf: 'baseline',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginEnd: 4,
    backgroundColor: color.white,
    elevation: 10,
  },
  title: {
    color: color.black,
  },
});
