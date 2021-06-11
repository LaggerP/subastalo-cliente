import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Icon} from 'react-native-elements';

// Logos
import visaIcon from '../../../assets/cardIcons/visa.png';
import masterCardIcon from '../../../assets/cardIcons/mastercard.png';
import americanExpress from '../../../assets/cardIcons/americanexpress.png';
import {MetodoPagoContext} from '../../context/MetodoPagoContext';

const TarjetaCard = ({navigation, data}) => {
  const {metodoPagoElegido, setMetodoPagoElegido} = useContext(MetodoPagoContext);

  const {entidad, idCliente, idTarjeta, lastNumbers, nombreTitular, numero, vencimiento} = data

  const financialCoIcon = {
    3: americanExpress,
    4: visaIcon,
    5: masterCardIcon
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
                style={{width: 65, height: 65,}}
                source={financialCoIcon[numero.charAt(0)]}
              />
            </View>
            <View style={{marginHorizontal: 15}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{entidad.toUpperCase()} **** {lastNumbers}</Text>
              <Text style={{fontSize: 13, color: '#000', fontWeight: 'bold'}}>
                Vencimiento: {vencimiento}
              </Text>
              <Text style={{fontSize: 13, color: '#FC9905', fontWeight: 'bold'}}>
                {(idTarjeta === metodoPagoElegido.idTarjeta) ? 'Seleccionada actualmente' : 'Elegir este método de' +
                  ' pago'}
              </Text>
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
    marginTop: 15,
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


})

export default TarjetaCard;
