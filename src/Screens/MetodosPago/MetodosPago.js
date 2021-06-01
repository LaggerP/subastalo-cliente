import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Pressable} from 'react-native';
//import {Button} from 'react-native-elements';
import {DataContext} from "../../context/DataContext";

const MetodosPago = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerAdd}>
                <Pressable style={styles.btnAdd} onPress={() => navigation.push('NewTarjeta')}>
                    <Text style={styles.btnAddText}>Agregar</Text>
                    <Text style={styles.btnAddText}>Tarjeta</Text>
                </Pressable>
                <Pressable style={styles.btnAdd} onPress={() => navigation.push('NewTransferencia')}>
                    <Text style={styles.btnAddText}>Agregar</Text>
                    <Text style={styles.btnAddText}>Cuenta</Text>
                </Pressable>
            </View>
            <Pressable style={styles.cardTarjeta} disabled>
                <Text style={styles.cardTarjetaText}>XXXX XXXX XXXX 1234</Text>
                <Text style={styles.cardTarjetaText}>Matías Cardozo</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerAdd: {
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      btnAdd: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FC9905',
          paddingVertical: 15,
          paddingHorizontal: 49,
          borderRadius: 4,
          elevation: 3,
          marginHorizontal:5,
      },
      btnAddText: {
          fontSize: 20,
          lineHeight: 21,
          fontWeight: 'bold',
          color: '#FAFAFA',
          marginVertical:5,
      },
      cardTarjeta: {
          backgroundColor: '#4051E9',
          paddingVertical: 15,
          paddingHorizontal: 4,
          borderRadius: 4,
          elevation: 3,
          height: 150
      },
      cardTarjetaText: {
          fontSize:15,
          color: '#FAFAFA',
          marginVertical:5,
      }
})

export default MetodosPago
