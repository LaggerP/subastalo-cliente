import {StatusBar} from 'expo-status-bar';
import React, {createRef, useContext} from 'react';
import {StyleSheet, View, Button, TextInput, Pressable, Text, TouchableOpacity} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';

// Context
import {DataContext} from "../../context/DataContext";

const NuevaCuentaBancaria = ({navigation}) => {
  const [entidad, onChangeEntidadB] = React.useState(null);
  const [cbu_alias, onChangeCBU] = React.useState(null);
  const [nombreTitular, onChangeNombre] = React.useState(null);
  const [checked, toggleChecked] = React.useState(false);

  //Data form Data Context
  const {userData} = useContext(DataContext);

  const createCB = async (dataCB) => {
    try {
      let cuentaBDatos = await fetch('http://10.0.2.2:3000/api/metodo-de-pago/new/cuenta-bancaria', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCB)
      });
      console.log(await cuentaBDatos.json())
      return cuentaBDatos.status;
    } catch (e) {
      console.log(e);
    }
  };

  const createCuenta = async () => {
    if (checked) {
      let dataCB = {
        // idCliente: userData.idCliente,
        idCliente: 2,
        nombreTitular: nombreTitular,
        entidad: entidad,
        cbu_alias: cbu_alias,
      }
      console.log(dataCB);
      const status = await createCB(dataCB);
      console.log(status);
      if (status === 201) {
        console.log('Cuenta Bancaria creada con éxito')
      }
    } else {
      console.log('Debe aceptar los términos de pago para continuar')
    }
  };

  return (
    <>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff',
      }}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            marginTop: '15%',
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            name='arrow-back-outline'
            type='ionicon'
            color='#000'
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEntidadB}
          value={entidad}
          placeholder='Entidad Bancaria'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeCBU}
          value={cbu_alias}
          placeholder='CBU o Alias'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNombre}
          value={nombreTitular}
          placeholder='Nombre completo'
        />
        <CheckBox
          title='Acepto los términos de pago *'
          checked={checked}
          onPress={() => toggleChecked(!checked)}
        />
        <Pressable style={styles.button} onPress={createCuenta}>
          <Text style={styles.buttonText}> Aceptar </Text>
        </Pressable>
      </View>
    </>
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
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    borderRadius: 4,
    marginTop: 20,
    height: 50,
    width: 150
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAFAFA',
  }
});

export default NuevaCuentaBancaria