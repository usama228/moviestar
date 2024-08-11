import React, { useState } from 'react';
import {  Input, Main, ScrollView, Spinner, YStack, useTheme, Image } from 'tamagui';
import { Container, Subtitle, Title } from '../../../tamagui.config';
import { useQuery } from "@tanstack/react-query";
import { getSearchResults, getTrending } from '../../../services/api';
import useDebounce from '../../../utils/useDebounce';
import MovieCard from '../../../components/MovieCard';
import Leaderboard from '../../../components/Leaderboard';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../../components/Footer';

const Page = () => {
  const theme = useTheme();
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <ScrollView>
      <Main>
        <ImageBackground
          source={{
            uri: 'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/ghQrKrcEpAlkzBuNoOCSxHQXWqw.jpg',
          }}
          style={{ width: '100%', height: 200 }}>
          <Container>
            <YStack>
              <Title
                color={'white'}
                enterStyle={{
                  opacity: 0,
                  scale: 1.5,
                  y: -10,
                }}
                animation="quick">
                Trending
              </Title>
              <Input
                placeholder="Search for a movie, tv show, person...."
                placeholderTextColor={'#fff'}
                borderWidth={1}
                size={'$4'}
                value={searchString}
                onChangeText={(text) => setSearchString(text)}
              />
            </YStack>
          </Container>
        </ImageBackground>

        <Subtitle
          p={10}
          enterStyle={{
            opacity: 0,
          }}
          animation="lazy">
          {searchQuery.data?.results ? 'Search Results' : 'Trending'}
        </Subtitle>

        {(trendingQuery.isLoading || searchQuery.isLoading) && (
          <Spinner py={14} size="large" color={'$blue10'} />
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          py={40}
          contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
          {searchQuery.data?.results ? (
            <>{searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}</>
          ) : (
            <>
              {trendingQuery.data?.results && (
                <>
                  {trendingQuery.data?.results.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>

        <Leaderboard />
        <ImageBackground  source={{
            uri: 'https://media.istockphoto.com/id/1496083826/photo/purple-background.webp?b=1&s=170667a&w=0&k=20&c=1w5M2gf_wh1Zw0PhSBKvQgT9P51PQN20jgUHCYQQN2I=',
          }} style={{width:'100%',height:200}} >
            <Title  color={'white'}
                enterStyle={{
                  opacity: 0,
                  scale: 1.5,
                  y: -10,
                }}
            animation="quick" style={{fontSize:25,marginLeft:10,marginTop:7}}> Join Today</Title>
<View>
<Text style={{fontSize:11,color:'white',marginLeft:7,fontStyle:'italic'}}>Get access to maintain your own custom personal lists, track what you've seen and search and filter  if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Zee5, Sun Nxt, and Rooster Teeth.</Text>

<Text style={{fontSize:12,marginLeft:8,color:'white'}}>• Enjoy TMDB ad free
</Text>
<Text style={{fontSize:12,marginLeft:8,color:'white'}}>• Maintain a personal watchlist
</Text>
<Text style={{fontSize:12,marginLeft:8,color:'white'}}>• Log the movies and TV shows you've seen
</Text>
<Text style={{fontSize:12,marginLeft:8,color:'white'}}>• Build custom lists
</Text>
<Text style={{fontSize:12,marginLeft:8,color:'white'}}>• Contribute to and improve our database
</Text>

</View>
          </ImageBackground>

      <Footer/>
      </Main>
    </ScrollView>
  );
};

export default Page;





