import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from "react-native-elements";

const RestablecerPrimer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Restablecer Contraseña</Text>
      <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
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
          onPress={() => alert("Enviado")}
          title="Enviar"
        />
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
  textoAbajo: {
    color: '#7E7E7E',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

export default RestablecerPrimer