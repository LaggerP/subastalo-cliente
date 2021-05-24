import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
//import {Button} from 'react-native-elements';
import {DataContext} from "../../context/DataContext";

const MetodosPago = ({navigation}) => {

    const data = [
        {
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: ''
        }
    ]

    //Data from context provider
    // const {userData, metodospago, setmetodospago} = useContext(DataContext);
    // console.log(metodospago)

    // const getMetodosPago = async () => {
    //     return await fetch('http://localhost:3000/api/metodos-de-pago')
    //     .then((response) => response.json())
    //     .then((json) => {
    //         setmetodospago(json.metodospago);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }

    // useEffect(() => {
    //     getMetodosPago()
    // }, [])


    return (
        <View style={styles.container}>
            <View style={styles.containerAdd}>
                <Button title='Agregar Tarjeta' onPress={() => navigation.push('NewTarjeta')} color='#FC9905'/>
                <Button title='Agregar Cuenta' onPress={() => navigation.push('NewTransferencia')} color='#FC9905'/>
            </View>
            <Card>
                
            </Card>
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
      }
})

export default MetodosPago