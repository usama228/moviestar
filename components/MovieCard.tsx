import React from 'react';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Card, Paragraph,YStack } from 'tamagui';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ResultItem } from '@/interfaces/apiresults';
import { Text, View} from 'react-native';

type MovieCardProps = {
  movie: ResultItem;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const fillPercentage = 70; 

  return (
    <Link href={`/(drawer)/home/${movie.media_type === 'movie' ? 'movie' : 'tv'}/${movie.id}`} asChild>
      <Card elevate width={150} height={260} scale={0.9} hoverStyle={{ scale: 0.925 }} pressStyle={{ scale: 0.975 }} animation={'bouncy'}>
        <Card.Header p={0} style={{ position: 'relative' }}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
            alt={movie.title}
            style={{ width: 150, height: 200 }}
            sharedTransitionTag={`${movie.media_type === 'movie' ? 'movie' : 'tv'}-${movie.id}`}
          />
         
          <View style={{  bottom: 2, right:2, zIndex: 1 ,marginTop:27,alignSelf:'flex-end'}}>
            <AnimatedCircularProgress
              size={24}
              width={3}
              fill={fillPercentage}
              tintColor="#27bf79"
              backgroundColor="#3d5875"
              rotation={3}
              
            >
              {(fill) => <Text style={{fontSize:7, color:'white'}}>{`${fill.toFixed(0)}%`}</Text>}
            </AnimatedCircularProgress>
          </View>
        </Card.Header>
        <Card.Footer p={8}>
          <YStack>
            <Text style={{fontSize:18, color:'lightblue'}}>
              {movie.title || movie.name}
            </Text>
            <Paragraph theme={'alt2'}>{new Date(movie.release_date! || movie.first_air_date!).getFullYear()}</Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default MovieCard;



