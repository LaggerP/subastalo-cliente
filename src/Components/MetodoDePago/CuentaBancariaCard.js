import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "react-native-elements";

//Context
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

// Logos
import BBVALogo from '../../../assets/bankIcons/BBVA.png';
import santanderLogo from '../../../assets/bankIcons/Santander.png';
import galiciaLogo from '../../../assets/bankIcons/Galicia.png';
import itauLogo from '../../../assets/bankIcons/Itau.png'

const CuentaBancariaCard = ({navigation, data}) => {
  const {cbu_alias, entidad, idCliente, idCuentaBancaria, nombreTitular} = data

  const bankCoIcon = {
    'bbva': BBVALogo,
    'santander': santanderLogo,
    'galicia': galiciaLogo,
    'itau':itauLogo
  }

  if (data) {
    return (
      <View style={{marginHorizontal: 15}}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.goBack();
        }}>
          <View style={styles.metodoDePagoCard}>
            <View style={{marginHorizontal: 15}}>
              <Image
                style={{width: 65, height: 30,}}
                source={bankCoIcon[entidad.toLowerCase()]}
              />
            </View>
            <View style={{marginHorizontal: 15}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', flexWrap: 'wrap'}}>Cuenta {cbu_alias}</Text>

            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return null
  }

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  metodoDePagoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    height: 80,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  bbvaLogo: {width: 60, height: 30}

})

export default CuentaBancariaCard;
