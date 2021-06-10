import React from 'react';
import {Image, View} from 'react-native';
import {Button, Overlay, Text} from 'react-native-elements';
import shield from '../../../assets/imageIcons/shield.png'

export const ModalLogin = ({modalData, setShowModal, navigation}) => {
  const {visible, title, msg, icon} = modalData

  let iconToShow = {
    'wrongCredentials': shield,
  }

  const toggleOverlay = () => {
    setShowModal({...modalData, visible: !visible});
  };

  return (
    <View>
      <Overlay isVisible={visible}
               onBackdropPress={toggleOverlay}
               overlayStyle={{
                 alignItems: 'center',
                 textAlign: 'center',
                 height: 'auto',
                 width: 350,
                 borderRadius: 10
               }}>
        <Text h4 style={{marginTop: 20}}>{title}</Text>
        <Text style={{marginHorizontal: 18, marginTop: 20, textAlign: 'center'}}>{msg}</Text>
        <Image
          style={{width: 130, height: 130, marginVertical:30}}
          source={iconToShow[icon]}
        />
        <Button
          onPress={() => toggleOverlay()}
          title='Aceptar'
          titleStyle={{color: '#FC9905',}}
          buttonStyle={{
            backgroundColor: '#fafafa',
            borderRadius: 5,
            height: 45,
            width: 120,
            borderWidth: 1,
            borderColor: '#FC9905',
            marginHorizontal: 5,
            marginVertical: 30
          }}
        />

      </Overlay>
    </View>
  );
};