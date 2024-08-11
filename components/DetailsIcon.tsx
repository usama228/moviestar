import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'tamagui';

type DetailsIconProps = {
  isVisible: boolean;
  onClose: () => void;
  showSearchBar?: boolean; 
};

const DetailsIcon: React.FC<DetailsIconProps> = ({ isVisible, onClose, showSearchBar = false }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Avatar circular size="$4">
            <Avatar.Image src="https://ca-times.brightspotcdn.com/dims4/default/35bf950/2147483647/strip/true/crop/2048x1365+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7f%2Fe0%2Fb90dae2e11f02e5c1446cd51097c%2Fla-et-toronto-film-festival-2016-photo-studio-075" />
            <Avatar.Fallback bc="red" />
          </Avatar>
          <Text>User Details</Text>
         
          {showSearchBar && (
            <View>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              
            </View>
          )}
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DetailsIcon;

