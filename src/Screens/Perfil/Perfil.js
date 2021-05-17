import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Perfil = () => {
  return (
    <View style={styles.container}>
      <Text>Mi Perfil</Text>
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