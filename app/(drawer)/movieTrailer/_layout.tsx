import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'tamagui';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

// Sample data for movies
const movies = [
  { id: '1', title: 'Movie 1', posterUrl: 'https://example.com/poster1.jpg' },
  { id: '2', title: 'Movie 2', posterUrl: 'https://example.com/poster2.jpg' },
  // Add more movies as needed
];

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
};

type MovieTrailerScreenProps = {
  navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const MovieTrailerScreen: React.FC<MovieTrailerScreenProps> = ({ navigation }) => {
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
      <View style={{ padding: 16 }}>
        <Image
          source={{ uri: item.posterUrl }}
          style={{ width: 200, height: 300, borderRadius: 6 }}
        />
        <Text style={{ marginTop: 8 }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Movies
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
      />
    </View>
  );
};

export default MovieTrailerScreen;

