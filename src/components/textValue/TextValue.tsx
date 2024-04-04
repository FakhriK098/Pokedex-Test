import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextValueProps} from './textValue.interface';
import {color} from '../../themes';

const TextValue = ({label, value}: TextValueProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default TextValue;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: color.grey_8D92A3,
  },
  value: {
    fontSize: 14,
    color: color.black,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
