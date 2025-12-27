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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  if (!favorites.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>💔 No favorites yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ Your Favorites</Text>

      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate('Details', { movie: item })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // same blue as Home
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 16,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.7,
  },
});
