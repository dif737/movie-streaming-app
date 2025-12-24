import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;

  const openSite = () => {
    Linking.openURL(`https://www.themoviedb.org/movie/${movie.id}`);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <TouchableOpacity style={styles.button} onPress={openSite}>
        <Text style={styles.buttonText}>🎬 Watch this movie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  image: { height: 350, borderRadius: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 15 },
  overview: { color: '#cbd5f5', marginTop: 10, lineHeight: 22 },
  button: {
    marginTop: 20,
    backgroundColor: '#38bdf8',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontWeight: '700', color: '#020617' },
});
