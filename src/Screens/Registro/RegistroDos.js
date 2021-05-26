import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from "react-native-elements";

const RegistroDos = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Formulario de Registro</Text>
        <Text style={styles.subtitulo}>SEGUNDA ETAPA</Text>
        <Text style={styles.textoAbajo}>¡Su cuenta fue confirmada con éxito!</Text>
        <Text style={styles.textoAbajo}>Ahora es momento de que ingrese la{"\n"}contraseña que se asociará a tu cuenta</Text>
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry= {true}
        />
        <TextInput 
          style={styles.input}
          placeholder="Re-ingrese su contraseña"
          secureTextEntry= {true}
        />
        <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          }}
          containerStyle={{ margin: 20}}
          onPress={() => navigation.push('Dashboard')}
          title="Finalizar"
        />
        <Text style={styles.textoAbajo}>Gracias por registrarse en Subastalo</Text>
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
    fontSize: 15,
    marginBottom: 10,
  },
});

export default RegistroDos