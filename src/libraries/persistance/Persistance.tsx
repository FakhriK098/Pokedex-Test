import AsyncStorage from '@react-native-async-storage/async-storage';

const persistance = {
  setObject: (key: string, value: any) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
  getObject: async (key: string) => {
    const getItem = await AsyncStorage.getItem(key);
    if (getItem === null || getItem === undefined) {
      return null;
    } else {
      return JSON.parse(getItem);
    }
  },
};

export default persistance;
