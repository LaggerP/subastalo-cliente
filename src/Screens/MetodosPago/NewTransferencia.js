import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {DataContext} from "../../context/DataContext";
import {StyleSheet, View, Button, TextInput} from 'react-native';
import {CheckBox} from 'react-native-elements';

const NewTrasnfrerencia = () => {
    const [entidadB, onChangeEntidadB] = React.useState(null);
    const [CBU, onChangeCBU] = React.useState(null);
    const [nombre, onChangeNombre] = React.useState(null);
    const [terminos , checkTerminos] = React.useState(false);

    // const createTransferencia = async () => {
        
    // }

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
            keyboardType='numeric'
      />
      <TextInput
            style={styles.input}
            onChangeText={onChangeNombre}
            value={nombre}
            placeholder='Nombre completo'
      />
      <CheckBox
            title='Acepto términos de pago *'
            checked={checkTerminos}
        />
      <Button
        title="Aceptar"
        color="#FC9905"
        // onPress={}
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
  input: {
      height: 40,
      margin: 10,
      borderWidth: 1
  }
});

export default NewTrasnfrerencia