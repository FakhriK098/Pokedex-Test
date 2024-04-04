import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {getPokemonList} from './pokemonList.datasource';
import {Pokemon} from './pokemonList.interface';
import {aPokemonListState} from './pokemonList.model';
import {color} from '../../themes';
import Card from './pokemonList.fragments/Card';
import {RootStackParams} from '../../navigation/navigation.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {aPokemonFavorites} from '../pokemonDetail/pokemonDetail.model';
import {persistance} from '../../libraries';
import {POKEMON_FAVORITE} from '../../config/constant';
import {EmptyState} from '../../components';

const PokemonList = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [pokemonList, setPokemonList] = useRecoilState(aPokemonListState);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const setPokemonFavorites = useSetRecoilState(aPokemonFavorites);

  const renderData = () => {
    setLoading(true);
    getPokemonList(offset).then(res => {
      setLoading(false);
      const newPokemon: Pokemon[] = res.data;
      setPokemonList(prevPok => ({
        ...prevPok,
        data: [...pokemonList.data, ...newPokemon],
      }));
    });
  };

  React.useEffect(() => {
    renderData();
    persistance.getObject(POKEMON_FAVORITE).then(res => {
      setPokemonFavorites(res as number[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const fetchMoreData = () => {
    setOffset(offset + 8);
  };

  const renderFooter = () => {
    if (pokemonList.data.length !== 0) {
      return (
        <View style={styles.containerLoading}>
          {loading && <ActivityIndicator size={'large'} />}
        </View>
      );
    }
    return <></>;
  };

  const renderEmpty = () => {
    return <EmptyState />;
  };

  return (
    <View style={styles.page}>
      {loading && offset === 0 ? (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={pokemonList.data}
          renderItem={({item, index}) => (
            <Card
              name={item.name}
              imageUrl={item.sprites.other['official-artwork'].front_default}
              types={item.types}
              onPress={() => {
                navigate('Detail', {id: item.id});
              }}
              key={`${item.name}-${index}`}
              colorCard={item.colors.name}
            />
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          numColumns={2}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMoreData}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: color.white,
  },
  containerLoading: {
    marginVertical: 10,
  },
});
