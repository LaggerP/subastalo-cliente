import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity} from 'react-native';

// Provider
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

// Components
import CuentaBancariaCard from "../../Components/MetodoDePago/CuentaBancariaCard";
import TarjetaCard from "../../Components/MetodoDePago/TarjetaCard";
import {Icon} from "react-native-elements";

const MetodosPago = ({route, navigation}) => {
  const {metodosDePago, getMetodosDePago} = useContext(MetodoPagoContext);
  useEffect(() => {
  })

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
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
      <View style={styles.containerAdd}>
        <Pressable style={styles.btnAdd} onPress={() => navigation.navigate('NuevaTarjeta')}>
          <Text style={styles.btnAddText}>Agregar</Text>
          <Text style={styles.btnAddText}>Tarjeta</Text>
        </Pressable>
        <Pressable style={styles.btnAdd} onPress={() => navigation.navigate('NuevaCuentaBancaria')}>
          <Text style={styles.btnAddText}>Agregar</Text>
          <Text style={styles.btnAddText}>Cuenta Bancaria</Text>
        </Pressable>
      </View>
      {
        (metodosDePago !== undefined) ?
          <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 8, paddingLeft: 15}}>Mis tarjetas</Text>
            {metodosDePago.tarjetas.map((tarjeta, idx) => <TarjetaCard data={tarjeta} key={idx}
                                                                       navigation={navigation}/>)}
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 25, paddingLeft: 15}}>Mis Cuentas
              Bancarias</Text>
            {metodosDePago.cuentasBancarias.map((cuenta, idx) => <CuentaBancariaCard data={cuenta} key={idx}
                                                                                     navigation={navigation}/>)}
          </ScrollView>
          :
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 25, paddingLeft: 15}}>No hay metodos de
            pago</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:'100%'
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
    paddingHorizontal: 10,
    borderRadius: 4,
    marginVertical: 20,
    marginHorizontal:15,
    width: 170,
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  btnAddText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#FAFAFA',
    marginVertical: 5,
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
    fontSize: 15,
    color: '#FAFAFA',
    marginVertical: 5,
  }
})

export default MetodosPago
