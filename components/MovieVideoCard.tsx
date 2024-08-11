import React from 'react';
import { Card, Text } from 'tamagui';
import { Video } from '@/interfaces/apiresults'; 

type MovieVideoCardProps = {
  video: Video;
  onPlay: (videoId: string) => void;
};

const MovieVideoCard: React.FC<MovieVideoCardProps> = ({ video, onPlay }) => (
  <Card m={10} p={10} onPress={() => onPlay(video.id)}>
    <Text style={{color:'white'}}>{video.name}</Text>
   
  </Card>
);

export default MovieVideoCard;