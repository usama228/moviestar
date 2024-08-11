import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';
import { DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Avatar } from 'tamagui';
import { ImageBackground } from 'react-native';


const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

  const userName = 'Usama Aslam';
  const userEmail = 'usamaaslam888@gmail.com';

  const handleLogout = () => {
    console.log('Logout clicked');
  };

 
 

  const handleGoogleSignIn = () => {
   
    Linking.openURL('https://www.google.co.uk/search?q=google+link+address&sca_esv=1988b3a509d1e210&source=hp&ei=PuK4ZceRCp-Mxc8PtJiHiAQ&iflsig=ANes7DEAAAAAZbjwTpTHivTmL7luKN8CiUqWBlXpvUxz&oq=google+link+ad&gs_lp=Egdnd3Mtd2l6Ig5nb29nbGUgbGluayBhZCoCCAAyBRAAGIAEMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeSKFSUIQNWMVJcAF4AJABAJgBmAOgAbkfqgEIMi0xMC4zLjG4AQHIAQD4AQGoAgrCAhAQABgDGI8BGOUCGOoCGIwDwgIQEC4YAxiPARjlAhjqAhiMA8ICERAuGIAEGLEDGIMBGMcBGNEDwgILEAAYgAQYsQMYgwHCAggQABiABBixA8ICCxAAGIAEGLEDGMkDwgIEEAAYA8ICCxAAGIAEGIoFGJIDwgIHEAAYgAQYCg&sclient=gws-wiz');
  };

  const handleFacebookSignIn = () => {
    
    Linking.openURL('https://www.facebook.com/?stype=lo&deoia=1&jlou=Afclg4uukLvckOHFXrqtIPq1B-uqhe0nSHypKrL3TlGE8EY20o3g7UR7-6XqkwIIhqmkUVFYsDycfHJs8kR8WkZlDV0pup_yxnTIOooO87jqNw&smuh=49617&lh=Ac_PD9fXaF2sLc2LQWw');
  };

  const handleAppleStoreRedirect = () => {
    
    Linking.openURL('https://www.apple.com/app-store/');
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-vector/cinema-film-strips-blue-background_1017-23456.jpg' }}
        style={{ width: '100%', height: 850, marginTop:22 }}
      >

      <TouchableOpacity
        onPress={() => setIsAvatarExpanded(!isAvatarExpanded)}
        style={{ alignSelf: 'flex-start', padding: 16 }}
      >
        <Avatar circular size="$6">
          <Avatar.Image src="https://ca-times.brightspotcdn.com/dims4/default/35bf950/2147483647/strip/true/crop/2048x1365+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7f%2Fe0%2Fb90dae2e11f02e5c1446cd51097c%2Fla-et-toronto-film-festival-2016-photo-studio-075" />
          <Avatar.Fallback bc="red" />
        </Avatar>
        <Text style={{ color: 'white', fontSize: 15, marginTop: 8, alignSelf: 'flex-start' }}>{userName}</Text>
        <Text style={{ color: 'white', fontSize: 13, marginTop: 3, alignSelf: 'flex-start' }}>{userEmail}</Text>
      </TouchableOpacity>

      {isAvatarExpanded && (
        <Image
          source={{ uri: 'https://ca-times.brightspotcdn.com/dims4/default/35bf950/2147483647/strip/true/crop/2048x1365+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7f%2Fe0%2Fb90dae2e11f02e5c1446cd51097c%2Fla-et-toronto-film-festival-2016-photo-studio-075' }}
          style={{ width: 100, height: 100, alignSelf: 'flex-start', margin: 16 }}
        />
      )}

      <DrawerItemList {...props} />
      
    

      
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',  marginTop:280}}>
    
     
      
        <TouchableOpacity style={{borderRadius:5}} onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:5}}onPress={handleFacebookSignIn}>
          <Ionicons name="logo-facebook" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:5}}onPress={handleAppleStoreRedirect}>
          <Ionicons name="logo-apple" size={32} color="black" />
        </TouchableOpacity>
      </View>
   
      <Text style={{ color: 'white', fontSize: 15, alignSelf:'center',marginTop:15 }}>
        Sign Up with ?
      </Text>
      </ImageBackground>
      {/* Logout Button */}
      <TouchableOpacity
        style={{
          borderRadius: 3,
          backgroundColor: '#032541',
          alignSelf: 'center',
          padding: 10,
          width: 282,
          height: 50,
          marginTop: 'auto',
         
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const Layout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue6,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: 20 },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: 'Moviestar',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="movieTrailer"
        options={{
          title: 'Movie Trailer',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      
    </Drawer>
    
  );
};

export default Layout;
