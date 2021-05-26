import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Icon} from "react-native-elements";

// Provider
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

// Components
import CuentaBancariaCard from "../../Components/Subasta/CuentaBancariaCard";
import TarjetaCard from "../../Components/Subasta/TarjetaCard";

const MetodosDePagoSubasta = ({navigation}) => {

  //Data from Metodo Pago Provider
  const {metodosDePago} = useContext(MetodoPagoContext);
  const {tarjetas, cuentasBancarias} = metodosDePago;

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
      <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 8, paddingLeft: 15}}>Mis tarjetas</Text>
        {tarjetas.map((tarjeta, idx) => <TarjetaCard data={tarjeta} key={idx} navigation={navigation} />)}
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 25, paddingLeft: 15}}>Mis Cuentas
          Bancarias</Text>
        {cuentasBancarias.map((cuenta, idx) => <CuentaBancariaCard data={cuenta} key={idx} navigation={navigation}/>)}
      </ScrollView>

      <View style={styles.nuevoMetodoContainer}>
        <Button
          onPress={() => navigation.goBack()}
          title='Agregar nuevo método de pago'
          type='solid'
          titleStyle={{fontWeight: '100', color: '#fafafa', paddingLeft: 8}}
          icon={<Icon name='add-circle-outline' size={25} color='#fafafa' type='ionicons'/>}
            buttonStyle={{
            backgroundColor: '#FC9905',
            borderRadius: 5,
            width: 350,
            borderWidth: 1.7,
            borderColor: '#FC9905',
            marginHorizontal: 5
          }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#FAFAFA',
    flexDirection: 'column',
  },

  nuevoMetodoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 90,
  }
})
export default MetodosDePagoSubasta;
