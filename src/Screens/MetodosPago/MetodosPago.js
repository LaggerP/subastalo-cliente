import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';

// Provider
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

// Components
import CuentaBancariaCard from "../../Components/Subasta/CuentaBancariaCard";
import TarjetaCard from "../../Components/Subasta/TarjetaCard";

const MetodosPago = ({navigation}) => {

    //Data form Metodo Pago Provider
    // const {metodosDePago} = useContext(MetodoPagoContext);
    // const {tarjetas, cuentasBancarias} = metodosDePago;

    return (
        <View style={styles.container}>
            <View style={styles.containerAdd}>
                <Pressable style={styles.btnAdd} onPress={() => navigation.push('NuevaTarjeta')}>
                    <Text style={styles.btnAddText}>Agregar</Text>
                    <Text style={styles.btnAddText}>Tarjeta</Text>
                </Pressable>
                <Pressable style={styles.btnAdd} onPress={() => navigation.push('NuevaCuentaBancaria')}>
                    <Text style={styles.btnAddText}>Agregar</Text>
                    <Text style={styles.btnAddText}>Cuenta Bancaria</Text>
                </Pressable>
            </View>
            {/* <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 8, paddingLeft: 15}}>Mis tarjetas</Text>
                {tarjetas.map((tarjeta, idx) => <TarjetaCard data={tarjeta} key={idx} navigation={navigation}/>)}
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 25, paddingLeft: 15}}>Mis Cuentas
                    Bancarias</Text>
                {cuentasBancarias.map((cuenta, idx) => <CuentaBancariaCard data={cuenta} key={idx} navigation={navigation}/>)}
            </ScrollView> */}
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
          paddingHorizontal: 10,
          borderRadius: 4,
          elevation: 3,
          marginHorizontal:5,
          width: 190,
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
