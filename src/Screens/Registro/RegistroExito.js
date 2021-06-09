import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Button } from "react-native-elements";

const RegistroExito = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>¡Muchas gracias por {"\n"}         registrarse!</Text>
        <Text style={styles.texto}>Pronto estará recibiendo un correo para poder {"\n"}acceder a su cuenta. Una vez haya iniciado {"\n"}sesión podrá participar de subastas, ofrecer {"\n"}artículos y mucho más.</Text>
        <Image source={{uri: 'https://i.imgur.com/UvIExyA.png'}} style={{width:150, height:150}}/>
        <Text style={styles.texto}>Recuerde que debe contar con al menos {"\n"}un medio de pago para poder ofertar en las {"\n"}subastas.</Text>
        <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          }}
          containerStyle={{ margin: 5 }}
          onPress={() => navigation.push('Dashboard')}
          title="Aceptar"
        />
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
    alignItems: 'center',
    textAlign: 'justify',
  },
  texto: {
    fontSize:15,
    marginBottom:20,
    marginTop: 20,
  },
});

export default RegistroExito