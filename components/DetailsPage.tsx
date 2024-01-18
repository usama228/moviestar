
import React, { useEffect, useState } from "react";
import { View, ImageBackground, TouchableOpacity, Modal } from "react-native";
import Animated from "react-native-reanimated";
import { H1, Image, ScrollView, YStack, Text, Paragraph, Button, useTheme } from "tamagui";
import { useMMKVBoolean } from "react-native-mmkv";
import { useMMKVObject } from "react-native-mmkv";
import { Favorite } from "@/interfaces/favorites";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { MediaType } from "@/interfaces/apiresults";
import { getMovieDetails, getMovieCredits } from '../services/api';
import { Main } from '../tamagui.config';
import { LineChart } from 'react-native-chart-kit';




type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  const theme = useTheme();


  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  const castQuery = useQuery({
    queryKey: ['cast', id],
    queryFn: () => getMovieCredits(+id, mediaType),
  });

  useEffect(() => {
    const current = favorites || [];
    let isFav = current.some((fav) => fav.id === id && fav.mediaType === mediaType);

    setIsFavorite(isFav);
  }, [favorites]);

  const toggleFavorite = (itemId: string, itemMediaType: MediaType) => {
    const current = favorites || [];
    const isCurrentlyFavorite = current.some((fav) => fav.id === itemId && fav.mediaType === itemMediaType);

    if (!isCurrentlyFavorite) {
      setFavorites([
        ...current,
        {
          id: itemId,
          mediaType: itemMediaType,
          thumb: movieQuery.data?.poster_path,
          name: movieQuery.data?.title || movieQuery.data?.name,
        },
      ]);
    } else {
      setFavorites(current.filter((fav) => !(fav.id === itemId && fav.mediaType === itemMediaType)));
    }
  };

  const [isStatsModalVisible, setIsStatsModalVisible] = useState(false);

  const openStats = () => {
    setIsStatsModalVisible(true);
  };

  const closeStatsModal = () => {
    setIsStatsModalVisible(false);
  };

  const scoreHistory = [80, 85, 90, 87, 92, 88, 95]; // Replace this with your actual score history data

  
  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              unstyled
              onPress={() => toggleFavorite(id, mediaType)}
              scale={0.95}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.975 }}
              animation={'bouncy'}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={theme.blue9.get()}
              />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}
        >
          <Animated.Image
            borderRadius={6}
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}`,
            }}
            style={{ width: 200, height: 300, margin: 10 }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />

          
        </ImageBackground>

        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}
        >
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name}{' '}
            <Text fontSize={16}>(2023)</Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>

          <View>
            <Text fontSize={18} fontWeight="bold">
              Top Billed Cast:
            </Text>
            {castQuery.isLoading && <Text>Loading cast...</Text>}
            {castQuery.data?.cast && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {castQuery.data?.cast.map((cast) => (
                  <TouchableOpacity key={cast.id} onPress={() => openStats()}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w200${cast.profile_path}`,
                        }}
                        style={{ width: 120, height: 180, borderRadius: 6 }}
                      />
                      <Text>{cast.name}</Text>
                      <Text>{cast.character}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Ratings and Stats */}
          <TouchableOpacity onPress={openStats}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text fontSize={18} fontWeight="bold">
                Ratings: {movieQuery.data?.vote_average * 10}% {/* Assuming vote_average is in a scale of 0-10 */}
              </Text>
              <Ionicons name="information-circle" size={24} color={theme.blue7.get()} style={{ marginLeft: 5 }} />
            </View>
          </TouchableOpacity>

       
         
 

          {/* Stats Modal */}
          {isStatsModalVisible && (
            <Modal animationType="slide" transparent={true} visible={isStatsModalVisible}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
                  <Text fontSize={20} fontWeight="bold" style={{ marginBottom: 10 }}>
                    Movie Stats
                  </Text>
                  {/* Chart for Score Distribution */}
                  <View style={{ marginBottom: 20 }}>
                    <Text fontSize={16} fontWeight="bold" style={{ marginBottom: 10 }}>
                      Score Distribution
                    </Text>
                    <LineChart
                      data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',], // Replace with your labels
                        datasets: [
                          {
                            data: scoreHistory,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Change color as needed
                          },
                        ],
                      }}
                      width={300}
                      height={200}
                      chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      bezier
                    />
                  </View>
                  {/* Additional stats go here */}
                  <Button onPress={closeStatsModal} animation="bouncy">
                    Close
                  </Button>
                </View>
              </View>
            </Modal>
          )}
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;



