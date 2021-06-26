import React, { useState, useContext } from "react";
import {Picker, StyleSheet, TouchableOpacity, View} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import {Button, Icon} from 'react-native-elements';

// Components
import {ModalMetodosPago} from '../../Components/MetodoDePago/ModalMetodosPago';

//Context
import {DataContext} from "../../context/DataContext";
import { apiUrl } from "../../api";
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

const NuevaTarjeta = ({navigation}) => {
  
  const [cardData, setCardData] = useState(null);
  const [selectedBank, setSelectedBank] = useState('noBank');
  const [showModal, setShowModal] = useState({
    visible: false,
    title: '',
    msg: '',
    icon: ''
  });

  //Data form Data Context
  const {userData} = useContext(DataContext);
  const {getMetodosDePago} = useContext(MetodoPagoContext);

  const createTarjetaCredito = async (dataTarjeta) => {
    try {
      let tarjeta = await fetch(`${apiUrl}/api/metodo-de-pago/new/tarjeta`, {
        method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataTarjeta)
      });
      tarjeta = await tarjeta.json()
      return tarjeta;
    } catch (e) {
      console.log(e);
    }
  }

  const createTarjeta = async () => {
    let cardData2 = JSON.parse(cardData);
    if(cardData2!=null && cardData2['values']['name']!="" && cardData2['values']['number']!="" && cardData2['values']['expiry']!="" && cardData2['values']['cvc']!="" && selectedBank!='noBank'){
      let dataTarjeta = {
        nombreTitular: cardData2['values']['name'],
        entidad: selectedBank,
        numero: cardData2['values']['number'],
        vencimiento: cardData2['values']['expiry'],
        idCliente: userData.idCliente,
        codigo: cardData2['values']['cvc']
      }
      const nuevaTarjeta = await createTarjetaCredito(dataTarjeta);
      if (nuevaTarjeta.status === 201) {
        getMetodosDePago()
        setShowModal({
          visible: true,
          title: '¡Tarjeta creada correctamente!',
          msg: 'Recuerde que su tarjeta debe ser revisada y autorizada antes de utilizarla. Este proceso puede demorar hasta 24hs',
          icon: 'newMP'
        })
      }
    } else {
      setShowModal({
        visible: true,
        title: 'Datos inválidos',
        msg: 'Para continuar debe completar todos los campos',
        icon: 'warning'
      })
    }
    
  };

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <ModalMetodosPago modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>

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

      <View style={styles.containerCard}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}
          onChange={(formData) => setCardData(JSON.stringify(formData))}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#FC9905', marginBottom: 20, borderRadius: 8, marginHorizontal:30}}>
        <Picker
          selectedBank={selectedBank}
          style={{ height: 50, width: 300, color:'#fff' }}
          onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}
        >
          <Picker.Item label="Seleccione Banco" value="noBank" />
          <Picker.Item label="Banco BBVA" value="bbva" />
          <Picker.Item label="Banco Santander" value="santander" />
          <Picker.Item label="Banco Galicia" value="galicia" />
          <Picker.Item label="Banco Itau" value="itau" />
        </Picker>
      </View>
      <View style={styles.containerButton}>
        <Button 
          title='Aceptar'
          type='solid'
          buttonStyle={{
            backgroundColor: '#FC9905',
            borderRadius: 5,
            height: 45,
            width: 250,
            borderWidth: 1.7,
            borderColor: '#FC9905',
            marginHorizontal: 5
          }}
          onPress={createTarjeta}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    containerCard: {
      backgroundColor: "#fff",
      marginTop: 20,
      marginBottom:20
    },
    containerButton: {
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
  });

  export default NuevaTarjeta