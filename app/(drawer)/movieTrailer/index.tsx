import React, { useEffect, useState } from 'react';
import { View, FlatList, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'tamagui';
import { Subtitle, Title } from '../../../tamagui.config';
import { getMovieVideos } from '../../../services/api';
import { ImageSourcePropType, Linking } from 'react-native';
import { MediaType, Video } from '@/interfaces/apiresults';
import MovieVideoCard from '../../../components/MovieVideoCard';
import YouTube from 'react-native-youtube';

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const handleInstallYouTubeServices = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.gms');
  };

  useEffect(() => {
    const fetchMovieVideos = async () => {
      try {
        const movieId = 123; // Replace with the actual movie ID
        const videoResult = await getMovieVideos(movieId, MediaType.Movie);

        if (videoResult?.results) {
          const movieVideos: Video[] = videoResult.results.map((mv, index) => ({
            id: mv.id,
            name: mv.name,
            type: 'video',
            key: `${mv.id}-${index}`,
          }));

          setVideos(movieVideos);
        }
      } catch (error) {
        console.error('Error fetching movie videos:', error);
      }
    };

    fetchMovieVideos();
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={{
          uri: 'https://deadline.com/wp-content/uploads/2023/07/rev-1-BAR-FP-0129r_High_Res_JPEG.jpeg?w=681&h=383&crop=1',
        }}
        style={{ width: '100%', height: 200 }}>
        <Title color={'#fff'} enterStyle={{ opacity: 0, scale: 1.5, y: -10 }} animation="quick">
          Trailer
        </Title>
        <TouchableOpacity
          style={{ borderRadius: 8, borderColor: 'white', borderWidth: 3, width: 100, height: 30, marginLeft: 9, marginTop: 7 }}>
          <Text style={{ alignItems: 'center', color: 'white' }}>Check it out</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Subtitle p={10} enterStyle={{ opacity: 0 }} animation="lazy">
        Latest Trailers
      </Subtitle>

      {/* Render MovieVideoCard without ScrollView */}
      <View>
        {videos.map((video) => (
          <MovieVideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
        ))}
      </View>

      {/* Render YouTube player for the selected video */}
      {selectedVideoId && (
        <View>
          <YouTube
            apiKey="074f2b79ba6bd92a5708b790600ecb73"
            videoId={selectedVideoId}
            play
            fullscreen
            loop
            onError={(error) => {
              console.error('YouTube Player Error:', error);
              if (error.error === 'SERVICE_MISSING') {
                handleInstallYouTubeServices();
              }
            }}
            style={{ alignSelf: 'stretch', height: 300 }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Page;





