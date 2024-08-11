

import React, { useState } from 'react';
import {  View, Text, Image } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Modal, TouchableOpacity } from 'react-native';

interface HeaderProps {
  onNotificationPress: () => void;
  onAvatarPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNotificationPress, onAvatarPress }) => {
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  const toggleNotificationModal = () => {
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleNotificationModal} style={{ marginLeft: 10 }}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationPress} style={{ marginLeft: 10 }}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAvatarPress} style={{ marginLeft: 10 }}>
        <Image
          source={{ uri: 'https://www.google.co.uk/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw2WgVIz_OF8oIUXZiHGo-BW&ust=1706189964319000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOD3uoeT9oMDFQAAAAAdAAAAABAD' }} // Replace with your avatar image source
          style={{ width: 24, height: 24, borderRadius: 12 }}
        />
      </TouchableOpacity>

     
      <Modal visible={isNotificationModalVisible} onRequestClose={toggleNotificationModal}>
        <View style={{ padding: 16 }}>
          <Text>Notification 1</Text>
          <Text>Notification 2</Text>
        </View>
      </Modal>
    </>
  );
};

export default Header;
