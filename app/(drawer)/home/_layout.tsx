
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useTheme, Avatar } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Linking, TouchableOpacity, View } from 'react-native';
import Header from '@/components/Header';
import DetailsIcon from '../../../components/DetailsIcon';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  const theme = useTheme();
  const [detailsVisible, setDetailsVisible] = useState(false);


  const handleNotificationPress = () => {
    // Handle notification press
  };

  const handleAvatarPress = () => {
    // Handle avatar press
    // You can add logic to navigate to the user profile or perform other actions
    setDetailsVisible(true);
  };

  return (
    <><Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        headerTitleAlign: 'center',
        headerTitleStyle: {},
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.themoviedb.org/?language=af-ZA')} style={{ marginLeft: 10 }}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotificationPress} style={{ marginLeft: 10 }}>
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
            {/* Use DetailsIcon for the user avatar */}
            <TouchableOpacity onPress={handleAvatarPress} style={{ marginLeft: 10 }}>
              <Avatar circular size="$2">
                <Avatar.Image src="http://placekitten.com/200/300" />
                <Avatar.Fallback bc="red" />
              </Avatar>
            </TouchableOpacity>
          </View>
        ),
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Moviestar',
        }} />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }} />
      <Stack.Screen
        name="tv/[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }} />
    </Stack><DetailsIcon isVisible={detailsVisible} onClose={() => setDetailsVisible(false)} showSearchBar={true} />
</>
  );
};

export default Layout;
