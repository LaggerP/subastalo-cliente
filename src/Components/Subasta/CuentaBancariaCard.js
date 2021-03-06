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
  const {metodoPagoElegido, setMetodoPagoElegido} = useContext(MetodoPagoContext);
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
          setMetodoPagoElegido(data)
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
              <Text style={{
                fontSize: 13,
                color: '#FC9905',
                fontWeight: 'bold'
              }}>{(idCuentaBancaria === metodoPagoElegido.idCuentaBancaria) ? 'Seleccionada actualmente' : 'Elegir este método de' +
                ' pago'}</Text>
            </View>
            <View style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end', paddingRight: 20
            }}>
              <Icon
                name='chevron-forward-outline'
                type='ionicon'
                color='#000'
                size={30}
              />
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
    backgroundColor: '#FAFAFA',
  },
  metodoDePagoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    height: 80,
    backgroundColor: '#fafafa',
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
