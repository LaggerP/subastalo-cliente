import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import {
  useFonts,
  CinzelDecorative_400Regular,
  CinzelDecorative_700Bold,
  CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import {Roboto_500Medium, Roboto_400Regular} from '@expo-google-fonts/roboto';
import {Button} from "react-native-elements";
import {DataContext} from '../../context/DataContext';

const Login = ({navigation}) => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const {setUserData} = useContext(DataContext);

  let [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
    Roboto_500Medium,
    Roboto_400Regular
  });

  const login = async () => {
    try {
      let loginDatos = await fetch('http://10.0.2.2:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      let user = await loginDatos.json();
      await setUserData(user.userData);
      if (loginDatos.status === 200) {
        await AsyncStorage.setItem('sesionIniciada', 'true');
        const data = await AsyncStorage.getItem('sesionIniciada');
        navigation.navigate('DashboardScreen', {
          screen: 'Dashboard',
          params: {sesionIniciada: data === 'true', userData: user.userData},
        })
      }
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.noMeLaContainer}>
        <Text style={styles.textArriba}>Subastalo</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>¡Hola de nuevo! {"\n"} Ingrese sus credenciales</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={(text) => setLoginInfo({...loginInfo, email: text})}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setLoginInfo({...loginInfo, password: text})}
        />
        <Text style={styles.olvide} onPress={() => navigation.push('RestablecerPrimer')}>Olvidé mi contraseña</Text>
        <Button
          buttonStyle={{
            width: 255,
            height: 45,
            backgroundColor: '#FD9419',
            borderRadius: 5,
          }}
          containerStyle={{margin: 5}}
          onPress={() => login()}
          title="Iniciar sesión"
        />
        <Button
          buttonStyle={{
            width: 255,
            height: 45,
            borderRadius: 5,
            borderColor: '#FD9419',
            borderWidth: 2,
          }}
          containerStyle={{margin: 5}}
          onPress={() => navigation.push('RegistroUno')}
          title="Crear cuenta"
          type='outline'
          titleStyle={{color: "#FD9419"}}
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
  noMeLaContainer: {
    backgroundColor: '#FC9905',
    height: '50%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
  inputText: {
    height: 45,
    width: '75%',
    margin: 6,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#F3F2F2',
    paddingLeft: 10,
    fontSize: 15,

  },
  textArriba: {
    fontFamily: 'CinzelDecorative_400Regular',
    fontSize: 50,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 100,
  },
  text: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    lineHeight: 30,
  },
  olvide: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    color: '#FC9905',
    width: '75%',
    marginTop: 10,
    marginBottom: 20,

  }
});

export default Login