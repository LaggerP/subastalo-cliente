import {StatusBar} from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from "react-native-elements";
import {ModalLogin} from "../../Components/Subasta/ModalLogin";
import {DataContext} from '../../context/DataContext';

const RestablecerSegundo = () => {

  const {contraseña, setContraseña} = useState('');
  const {segundaContraseña, setSegundaContraseña} = useState('');

  const {userMailForgot} = useContext(DataContext);

  const [showModal, setShowModal] = useState({
    visible: false,
    title: '¡Ups!',
    msg: 'Ha ocurrido un error. Vuelva a intentarlo.',
    icon: 'subastaError'
  });

  const olvidado = async ({navigation}) => {
    if (contraseña===segundaContraseña){
      let user = {
        email: userMailForgot,
        password: contraseña
      }
      console.log(user);
    try{
        let loginDatos = await fetch('http://10.0.2.2:3000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (loginDatos.status === 201){
        navigation.push('Login')
      }
      else {
        setShowModal({...showModal, msg: 'Ha ocurrido un error. Vuelva a intentarlo.', visible: true});
      }
    }catch (e) {
      console.log(e);
    }
    }else{
      setShowModal({...showModal, msg:'Las contraseñas no coinciden. Vuelva a intentarlo.', visible: true});
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Restablecer Contraseña</Text>
      <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setContraseña}
          secureTextEntry= {true}
        /> 
        <TextInput 
          style={styles.input}
          placeholder="Re-ingrese nueva contraseña"
          onChangeText={setSegundaContraseña}
          secureTextEntry= {true}
        /> 
        <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          marginTop: 150,
          }}
          containerStyle={{ margin: 5 }}
          onPress={olvidado}
          title="Guardar"
        />
      {showModal.visible ? (
        <ModalLogin modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>) 
        : (null)
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
    borderColor: '#F3F2F2'
  },
});

export default RestablecerSegundo