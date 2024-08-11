import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import SignUp from '../components/SignUpPage'; 
import { useTheme } from 'tamagui';

interface FooterProps {
  
}

const Footer: React.FC<FooterProps> = () => {
  const theme = useTheme();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpData, setSignUpData] = useState(null);

  const data = [
    'THE BASICS',
    'About TMDB',
    'Contact Us',
    'System Status',
    'Add New TV Show',
    'Leaderboard',
    'LEGAL',
    'Terms of Use',
    'DMCA Policy',
    'upload',
  ];

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleSignUp = (data: any) => {
    setSignUpData(data);
   
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={[styles.item, { backgroundColor: theme.blue7.get() }]}>
      <Text style={{ color: 'white' }}>{item}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <LinearGradient colors={[theme.blue5.get(), theme.blue7.get()]} style={styles.footer}>
      <View style={styles.footerContent}>
        <Image source={require('../assets/usa.png')} style={styles.footerImage} />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpClick}>
          <Text style={styles.signUpButtonText}>JOIN COMMUNITY</Text>
        </TouchableOpacity>
      </View>

      
      <Modal visible={showSignUpModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <SignUp onSignUp={handleSignUp} closeModal={() => setShowSignUpModal(false)} />
        </View>
      </Modal>
    </LinearGradient>
  );

  return (
    <View style={[styles.footer, { backgroundColor: theme.blue4.get() }]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        ListFooterComponent={renderFooter}
      />

      
      {signUpData && (
        <View style={styles.signUpDataContainer}>
          <Text>Signed Up Data:</Text>
          <Text>{JSON.stringify(signUpData)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 300,
    marginTop: 16,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerImage: {
    width: '35%', 
    height: '200%', 
    resizeMode: 'contain',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 6,
    borderRadius: 8,
  },
  signUpButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginLeft: 7, 
    alignItems: 'center',
    height: 40,
    width: 140,
    justifyContent: 'center',
  },
  signUpButtonText: {
    color: '#04b4e4',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpDataContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default Footer;