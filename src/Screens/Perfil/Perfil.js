import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {DataContext} from "../../context/DataContext";

const Perfil = ({navigation}) => {
  const {setUserData} = useContext(DataContext);

  const logOut = async () => {
    let keys = ['email', 'password', 'sesionIniciada'];
    await AsyncStorage.multiRemove(keys, (err) => {
      setUserData(null)
      console.log('Local storage ');
      navigation.pop()
    });
  }
  return (
    <View style={styles.container}>
      <Text>Mi Perfil</Text>
      <Button
        title="Cerrar sesión"
        type="clear"
       onPress={()=> logOut()}/>
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
});

export default Perfil