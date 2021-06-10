import {StatusBar} from 'expo-status-bar';
import React, {useContext, useState} from 'react';

import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from "react-native-elements";

import {DataContext} from '../../context/DataContext';
import {ModalLogin} from "../../Components/Login/ModalLogin";

const RestablecerPrimer = ({navigation}) => {

  const [email, setEmail] = useState('');

  const {setUserMailForgot} = useContext(DataContext);

  const [showModal, setShowModal] = useState({
    visible: false,
    title: '¡Ups!',
    msg: 'Correo incorrecto. Por favor, compruebe sus correo y vuelva a intentarlo.',
    icon: 'wrongCredentials'
  });

  const olvidado = async () => {
    try{
      let restablecerDatos = await fetch('http://10.0.2.2:3000/api/user/forgot-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    });
    console.log(email)
    console.log(restablecerDatos.status)
    // if (loginDatos.status == 201){
    //   setUserMailForgot(email);
      // navigation.push('RestablecerSegundo')
      
    // }
    // else {
    //   setShowModal({...showModal, visible: true});
    // }
  } catch (e) {
    console.log(e);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Restablecer Contraseña</Text>
      <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      <Text style={styles.textoAbajo}>Se le estará enviando un correo con un enlace {"\n"}para restablecer su contraseña. {"\n"}Recuerde que el enlace estará activo por un {"\n"}plazo de 24hrs.</Text>
      <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          marginTop: 150,
          }}
          containerStyle={{ margin: 5 }}
          onPress={olvidado}
          title="Enviar"
        />
        {showModal.visible ? (
        <ModalLogin modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>) 
        : null
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 250,
    margin: 6,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#F3F2F2',
    paddingLeft: 10
  },
  textoAbajo: {
    color: '#7E7E7E',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

export default RestablecerPrimer