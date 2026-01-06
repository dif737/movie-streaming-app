import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (text) => {
    setQuery(text);

    if (text.length < 2) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchMovies(text);

      // TMDB search returns an object with "results"
      const list = Array.isArray(data?.results) ? data.results : [];

      const validMovies = list.filter(
        (item) => item.poster_path && item.title
      );

      setMovies(validMovies);
    } catch (e) {
      console.log('SEARCH ERROR', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔍 Search movies</Text>

      <TextInput
        style={styles.input}
        placeholder="Search a movie..."
        placeholderTextColor="#94a3b8"
        value={query}
        onChangeText={onSearch}
      />

      {loading && <ActivityIndicator color="#38bdf8" />}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Details', { movie: item })}
          />
        )}
        ListEmptyComponent={
          query.length > 1 && !loading ? (
            <Text style={styles.empty}>No movies found</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1e293b',
    color: '#fff',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 30,
  },
});
