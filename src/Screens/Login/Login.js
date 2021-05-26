import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import { Button } from "react-native-elements";

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.arribacontainer}>
        <Text style={styles.textArriba}>SUBASTALO</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>¡Hola de nuevo! {"\n"} Ingrese sus credenciales</Text>
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry= {true}
        /> 
        <Text style={styles.olvide} onPress={() => navigation.push('RestablecerPrimer')}>Olvidé mi contraseña</Text>
        <Button
          buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
          }}
          containerStyle={{ margin: 5 }}
          onPress={() => navigation.push('Dashboard')}
          title="Iniciar sesión"
        />
        <Button
          buttonStyle={{
            width: 250,
            borderRadius: 5,
            borderColor: '#FD9419',
            borderWidth: 2,
          }}
          containerStyle={{ margin: 5}}
          onPress={() => navigation.push('RegistroDos')}
          title="Crear cuenta"
          type='outline'
          titleStyle={{ color: "#FD9419"}}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arribacontainer: {
    backgroundColor:'#FC9905',
    height: '50%',
    width:'100%',
    position:'absolute',
    top:0,
    left:0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

  },
  loginContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 30,
    height: 400,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: '65%',
    margin: 6,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#F3F2F2'
  },
  textArriba: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 50,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 100,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    lineHeight: 30,
  },
  olvide: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#FC9905',
    width: '65%',
    marginTop:10,
    marginBottom: 20,
    
  }
});

export default Login