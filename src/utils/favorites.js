import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITES_MOVIES';

// 🔹 Lire les favoris
export const getFavorites = async () => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

// 🔹 Ajouter / retirer un favori
export const toggleFavorite = async (movie) => {
  const favorites = await getFavorites();

  const exists = favorites.find((m) => m.id === movie.id);

  let newFavorites;
  if (exists) {
    newFavorites = favorites.filter((m) => m.id !== movie.id);
  } else {
    newFavorites = [...favorites, movie];
  }

  await AsyncStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(newFavorites)
  );

  return newFavorites;
};

// 🔹 Vérifier si favori
export const isFavorite = async (movieId) => {
  const favorites = await getFavorites();
  return favorites.some((m) => m.id === movieId);
};
