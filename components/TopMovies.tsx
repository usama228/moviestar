import { useQuery } from 'react-query';
import { getTopMovies } from '../services/api';
import {  Text } from 'tamagui';
import { Title } from '@/tamagui.config';
import { TrendingResult, ResultItem } from '@/interfaces/apiresults';  
import { ScrollView } from 'react-native';


const TopMovies = () => {
 
  const { data: topMovies, error } = useQuery<TrendingResult>('topMovies', getTopMovies);

  if (error) {
   
    console.error('Error fetching top movies:', error);
    return <Text>Error fetching top movies</Text>;
  }

  return (
    <ScrollView>
      
      <Title color={'white'}>Top Movies</Title>
      {topMovies?.results && topMovies.results.map((movie: ResultItem) => (
        <Text key={movie.id}>{movie.title}</Text>
      ))}
    </ScrollView>
  );
};

export default TopMovies;
    