import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { toggleFavorite, isFavorite } from '../utils/favorites';

export default function MovieCard({ movie, onPress }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const fav = await isFavorite(movie.id);
    setFavorite(fav);
  };

  const onToggleFavorite = async () => {
    const newFavs = await toggleFavorite(movie);
    setFavorite(!favorite);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{movie.title}</Text>

      <TouchableOpacity onPress={onToggleFavorite}>
        <AntDesign
          name={favorite ? 'heart' : 'hearto'}
          size={22}
          color={favorite ? 'red' : '#888'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 140,
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 14,
  },
  title: {
    color: '#000',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
});
