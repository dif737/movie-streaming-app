import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

import { fetchMyList } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyList()
      .then((data) =>
        setMovies(data.filter(m => m.poster_path && m.title))
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={{ color: '#fff', marginTop: 10 }}>
          Loading movies...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Movies</Text>

      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
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
    backgroundColor: '#0b1220',
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 16,
  },
  list: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b1220',
  },
});
