import React from 'react';
import {Image, View} from 'react-native';
import {Button, Overlay, Text} from 'react-native-elements';
import trophy from '../../../assets/imageIcons/trophy.png';
import nuevaOferta from '../../../assets/imageIcons/nuevaOferta.png';
import subastaError from '../../../assets/imageIcons/subastaError.png';
import newMP from '../../../assets/imageIcons/newMP.png';
import pagoError from '../../../assets/imageIcons/warning.png';
import createError from '../../../assets/imageIcons/error-producto.png';

export const ModalMetodosPago = ({modalData, setShowModal, navigation}) => {
  const {visible, title, msg, icon} = modalData

  let iconToShow = {
    'winner': trophy,
    'nuevaOferta': nuevaOferta,
    'subastaError': subastaError,
    'newMP': newMP,
    'warning': pagoError,
    'createError': createError
  }

  const toggleOverlay = () => {
    setShowModal({...modalData, visible: !visible});
    if (modalData.icon === 'newMP' || modalData.icon === 'createError') {
      navigation.goBack();
    }
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
        <Text h4 style={{marginTop: 20, textAlign:'center'}}>{title}</Text>
        <Text style={{marginHorizontal: 18, marginTop: 20, textAlign: 'center'}}>{msg}</Text>
        <Image
          style={{width: 130, height: 130, marginVertical: 30}}
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