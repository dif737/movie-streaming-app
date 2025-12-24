import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import { getFavorites } from '../utils/favorites';
import MovieCard from '../components/MovieCard';

export default function FavoritesScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setMovies(favs);
  };

  if (!movies.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() =>
            navigation.navigate('Details', { movie: item })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
  },
});
