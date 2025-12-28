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
    isFavorite(movie.id).then(setFavorite);
  }, []);

  const onToggleFavorite = async () => {
    await toggleFavorite(movie);
    setFavorite((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />

        {/* ❤️ Heart overlay */}
        <TouchableOpacity style={styles.heart} onPress={onToggleFavorite}>
          <AntDesign
            name={favorite ? 'heart' : 'hearto'}
            size={22}
            color={favorite ? '#e50914' : '#fff'}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 16,
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
  title: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
