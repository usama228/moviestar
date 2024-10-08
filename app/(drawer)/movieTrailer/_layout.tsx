import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { View, useTheme } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  const theme = useTheme();

  return (

    
   
    
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'MovieTrailer',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
          
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: '',
          
        }}
      /> 
      <Stack.Screen
        name="tv/[id]"
        options={{
          title: '',
          
        }}
      />
    </Stack>
    
  );
};
export default Layout;