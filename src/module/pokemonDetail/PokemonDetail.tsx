import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {RootStackParams} from '../../navigation/navigation.interface';
import {color, images} from '../../themes';
import Type from '../pokemonList/pokemonList.fragments/Type';
import About from './pokemonDetail.fragments/About';
import Moves from './pokemonDetail.fragments/Moves';
import {aPokemonFavorites, sfPokemonDetail} from './pokemonDetail.model';
import {addToAsyncStorage, isFavorite, removeFromAsyncStorage} from './utils';
import {EmptyState} from '../../components';

const PokemonDetail = () => {
  const {params} = useRoute<RouteProp<RootStackParams, 'Detail'>>();
  const {goBack} = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const pokemonDetail = useRecoilValue(sfPokemonDetail(params.id));
  const [pokemonFavorite, setPokemonFavorite] =
    useRecoilState(aPokemonFavorites);
  const [isFav, setIsFav] = React.useState(
    isFavorite(params.id, pokemonFavorite),
  );

  if (!pokemonDetail) {
    return (
      <View style={styles.page}>
        <TouchableOpacity
          style={[styles.back, {marginStart: 16}]}
          onPress={() => {
            goBack();
          }}>
          <Image source={images.iconArrowLeft} style={styles.iconBack} />
        </TouchableOpacity>
        <EmptyState />
      </View>
    );
  }

  const handleFavorite = () => {
    setIsFav(!isFav);
    if (!isFav) {
      addToAsyncStorage({
        id: params.id,
        pokemonFavorite: pokemonFavorite,
        setPokemonFavorite: setPokemonFavorite,
      });
      return;
    }

    removeFromAsyncStorage({
      id: params.id,
      pokemonFavorite: pokemonFavorite,
      setPokemonFavorite: setPokemonFavorite,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.background,
            {backgroundColor: pokemonDetail.pokemon.colors.name},
          ]}
        />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              goBack();
            }}>
            <Image source={images.iconArrowLeft} style={styles.iconBack} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.back} onPress={handleFavorite}>
            <Image
              source={isFav ? images.iconFavoriteOn : images.iconFavoriteOff}
              style={styles.iconBack}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color:
                    pokemonDetail.pokemon.colors.name === 'white'
                      ? color.black
                      : color.white,
                },
              ]}>
              {pokemonDetail.pokemon.name}
            </Text>
            <View style={styles.type}>
              {pokemonDetail.pokemon.types.map(item => {
                return <Type type={item.type.name} size={'medium'} />;
              })}
            </View>
          </View>
          <Text
            style={[
              styles.idText,
              {
                color:
                  pokemonDetail.pokemon.colors.name === 'white'
                    ? color.black
                    : color.white,
              },
            ]}>{`#${pokemonDetail.pokemon.id}`}</Text>
        </View>
        <Image
          source={{
            uri: pokemonDetail.pokemon.sprites.other['official-artwork']
              .front_default,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <About pokemon={pokemonDetail.pokemon} />
          <Moves pokemon={pokemonDetail.pokemon} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  background: {
    opacity: 0.6,
    width: '100%',
    height: 700,
    position: 'absolute',
  },
  back: {
    marginTop: 20,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
  },
  type: {
    flexDirection: 'row',
    marginTop: 10,
  },
  idText: {
    marginTop: 25,
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  content: {
    paddingTop: 26,
    paddingHorizontal: 16,
    backgroundColor: color.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -10,
    flex: 1,
  },
});
