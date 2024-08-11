import React, { useState } from 'react';
import { Modal } from 'react-native';
import { View, Text, useTheme, Avatar, Image } from 'tamagui';

interface LeaderboardEntry {
  name: string;
  percentage: number;
  avatarUrl: string;
  details: string;
}

const Leaderboard: React.FC = () => {
  const theme = useTheme();

 
  const leaderboardData: LeaderboardEntry[] = [
    { name: 'Emma Stone', percentage: 57, avatarUrl: 'https://assets.teenvogue.com/photos/64d2695e3d2c4d3734d84c69/4:3/w_2916,h_2187,c_limit/emma%20stone%20blonde%20asymmetric%20bob%20(1).jpg' ,details:'Emily Jean "Emma" Stone (born November 6, 1988) is an American actress and producer. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and two Golden Globe Awards.Emily Jean "Emma" Stone (born November 6, 1988) is an American actress and producer. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and two Golden Globe Awards.'},
    { name: 'A.Jolie', percentage: 70, avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3deJ3SpRltnmCorL9th5ae7AqfZOxTzPWkQ&usqp=CAU', details:'Angelina Jolie Voight was born on June 4, 1975, at Cedars-Sinai Hospital in Los Angeles, California, to actors Jon Voight and Marcheline Bertrand. She is the sister of actor James Haven, and the niece of singer-songwriter Chip Taylor and geologist and volcanologist Barry Voight.'},
    { name: 'Hazal', percentage: 65, avatarUrl: 'data:image/jpeg;base64,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',details:'Kaya was born in Konya, Turkey. She attended Gaziosmanpaşa elementary school and graduated in 2009 from the Liceo Italiano di Istanbul. She enrolled in Istanbul Bilgi University for her higher education. Her parents, who are both lawyers, divorced when she was 7 years old.' },
    { name: 'Evgenia', percentage: 53, avatarUrl: 'https://qph.cf2.quoracdn.net/main-qimg-576368aedb1f8ea0001de3fd79024c8d-lq',details:'Evgeniya Nokhrina was born in Konya, Russia. She attended Gaziosmanpaşa elementary school and graduated in 2009 from the Liceo Italiano di Istanbul. She enrolled in Eussial Bilgi University for her higher education. Her parents, who are both lawyers, when she was 7 years old.' },
    
  ];

  
  const [expandedAvatar, setExpandedAvatar] = useState<number | null>(null);

  
  const handleAvatarClick = (index: number) => {
    setExpandedAvatar(expandedAvatar === index ? null : index);
  };

  return (
    <View padding={16} borderRadius={8} mb={4} style={{ width: '90%', marginLeft: 15 }}>
      <Text fontSize="$3" fontWeight="bold" color={theme.gray7?.get()} mb={4} style={{ marginBottom: 5 }}>
        Leaderboard
      </Text>
      {leaderboardData.map((entry, index) => (
        <View
          key={index}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={8}
        >
          <Avatar
            circular
            size="$3"
            onPress={() => handleAvatarClick(index)}
          >
            <Avatar.Image
              accessibilityLabel={entry.name}
              src={entry.avatarUrl}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <View flexDirection="row" alignItems="center">
            <Text fontSize="$3" color={theme.gray5} style={{ marginLeft: 4 }}>
              {entry.name}
            </Text>
            <View
              marginLeft={8}
              backgroundColor={'rgba(31, 130, 185, 0.8)'}
              height={10}
              borderRadius={5}
              width={`${entry.percentage}%`}
            />
          </View>
          <Text fontSize="$3" color={theme.gray5}>
            {entry.percentage}%
          </Text>
          
          <Modal visible={expandedAvatar === index} onRequestClose={() => setExpandedAvatar(null)}>
            <View padding={16} alignItems="center">
              <Image
                source={{ uri: entry.avatarUrl }}
                style={{ width: 200, height: 200, borderRadius: 8 }}
              />
              <Text fontSize="$3" color={theme.gray5} mt={4}>
                {entry.name}
              </Text>
              <Text fontSize="$2" color={theme.gray7} mt={2}>
                {entry.details}
              </Text>
            </View>
          </Modal>
        </View>
      ))}
    </View>
  );
};

export default Leaderboard;


