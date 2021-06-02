import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {DataContext} from "../../context/DataContext";
import {StyleSheet, View, Button, TextInput, Pressable, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

const NewTransferencia = () => {
    const [entidadB, onChangeEntidadB] = React.useState(null);
    const [CBU, onChangeCBU] = React.useState(null);
    const [nombre, onChangeNombre] = React.useState(null);
    const [checked , toggleChecked] = React.useState(false);

    const aceptar = () => {
        console.log(entidadB, CBU, nombre, checked)
     }

    return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEntidadB}
          value={entidadB}
          placeholder='Entidad Bancaria'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeCBU}
          value={CBU}
          placeholder='CBU o Alias'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNombre}
          value={nombre}
          placeholder='Nombre completo'
      />
        <CheckBox
          title='Acepto los términos de pago *'
          checked={checked}
          onPress={() => toggleChecked(!checked)}
        />
        <Pressable style={styles.button} onPress={aceptar}>
          <Text style={styles.buttonText}> Aceptar </Text>
        </Pressable>
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
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    width: 300,
    fontSize: 20,
    padding:10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    borderRadius: 4,
    marginTop: 20,
    height:50,
    width:150
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAFAFA',
  }
});

export default NewTransferencia
