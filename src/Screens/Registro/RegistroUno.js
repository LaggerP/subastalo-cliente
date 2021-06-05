import {StatusBar} from 'expo-status-bar';
import React, {useContex, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from "react-native-elements";

const RegistroUno = ({navigation}) => {

  const [userNombre, setUserNombre] = useState('');
  const [userApellido, setUserApellido] = useState('');


  const [registroInfo, setRegistroInfo] = useState({
    documento: '',
    nombre: '',
    direccion: '',
    email: '',
  });

  const registro = async () => {
    setRegistroInfo({...registroInfo, nombre: userNombre +' '+ userApellido})
    try{
      let registroDatos = await fetch('http://10.0.2.2:3000/api/user/new-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registroInfo)
    });
    if (registroDatos.status == 201){
      navigation.push('RegistroExito')
    };
  } catch (e) {
    console.log(e);
  }
}

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Formulario de Registro</Text>
        <Text style={styles.subtitulo}>PRIMERA ETAPA</Text>
        <TextInput 
          style={styles.input}
          placeholder="Documento de Identidad"
          keyboardType="number-pad"
          onChangeText={(text) => setRegistroInfo({...registroInfo, documento: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder="Nombre/s"
          onChangeText={setUserNombre}
        />
        <TextInput 
          style={styles.input}
          placeholder="Apellido/s"
          onChangeText={setUserApellido}
        />
        <TextInput 
          style={styles.input}
          placeholder="Dirección de domicilio"
          onChangeText={(text) => setRegistroInfo({...registroInfo, direccion: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={(text) => setRegistroInfo({...registroInfo, email: text})}
        />
        <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          }}
          containerStyle={{ margin: 5 }}
          onPress={registro}
          title="Crear cuenta"
        />
        <Text style={styles.textoAbajo}>El proceso de registro consta de dos (2) {"\n"}etapas. Cuando sus datos sean verificados {"\n"}recibirá un email con los pasos a seguir para {"\n"}poder hacer uso de Subastalo.</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:10,
  },
  subtitulo: {
    fontFamily: 'Roboto',
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
  textoAbajo: {
    color: '#7E7E7E',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

export default RegistroUno