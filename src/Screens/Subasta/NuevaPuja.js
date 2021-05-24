import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Pressable} from 'react-native';
import {Button, Icon} from 'react-native-elements';

// Provider
import {MetodoPagoContext, MetodoPagoProvider} from "../../context/MetodoPagoContext";

//Logos
import visaIcon from '../../../assets/cardIcons/visa.png';
import masterCardIcon from "../../../assets/cardIcons/mastercard.png";
import BBVALogo from "../../../assets/bankIcons/BBVA.png";
import santanderLogo from "../../../assets/bankIcons/Santander.png";
import galiciaLogo from "../../../assets/bankIcons/Galicia.png";


let initStatePuja = {
  idSubasta: 0,
  idCliente: 0,
  numeroPostor: 0,
  importe: 0,
  idItem: 0,
  asistente: 0
}


const NuevaPuja = ({route, navigation}) => {
  const {descripcionCompleta, precioBase} = route.params.item;

  //Data from Metodo Pago Provider
  const {metodoPagoElegido} = useContext(MetodoPagoContext);

  const {idTarjeta,numero, entidad, lastNumbers,cbu_alias} = metodoPagoElegido

  const [oferta, setOferta] = useState('');
  const [ofertaMinima, setOfertaMinima] = useState(false);
  const [ofertaMaxima, setOfertaMaxima] = useState(false);
  const [allowOferta, setAllowOferta] = useState(false);
  const [newPuja, setNewPuja] = useState(initStatePuja);

  // data obtenida a través de la DB
  const minValue = 25000;
  const maxValue = 30000;

  const financialCoIcon = {
    4: visaIcon,
    5: masterCardIcon
  }

  const bankCoIcon = {
    'bbva': BBVALogo,
    'santander': santanderLogo,
    'galicia': galiciaLogo,
  }

  const checkOferta = (_oferta) => {
    setOferta(_oferta);
    if (_oferta >= minValue && _oferta <= maxValue) {
      setOfertaMinima(false);
      setOfertaMaxima(false);
      setAllowOferta(true)
    } else if (_oferta > maxValue) {
      setOfertaMaxima(true);
      setOfertaMinima(false);
      setAllowOferta(false);
    } else if (_oferta < minValue) {
      setOfertaMaxima(false);
      setOfertaMinima(true);
      setAllowOferta(false);
    } else {
      setAllowOferta(false);
    }
  }

  return (
    <MetodoPagoProvider>
      <View style={styles.container}>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemTitle}>
            Descripción Item
          </Text>
          <View style={styles.itemCardDescription}>
            <View style={styles.itemTextContainer}>
              <Text style={{fontSize: 12}} numberOfLines={5} onPress={() => console.log('chau')}>
                {descripcionCompleta}
              </Text>
            </View>
            <View style={styles.verticleLine}/>
            <View style={styles.itemTextPriceContainer}>
              <Text style={{fontSize: 12}}>
                Precio Base
              </Text>
              <Text>
                {precioBase}
              </Text>
              <Text style={{fontSize: 12}}>
                Tiempo restante
              </Text>
              <Text>
                00:00:00
              </Text>
            </View>
          </View>

        </View>
        <View style={styles.ofertaContainer}>
          {
            (idTarjeta)
              ?
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('MetodoDePagoSubasta')}>
                <View style={styles.metodoDePagoContainer}>
                  <View style={{marginHorizontal: 15}}>
                    <Image style={{width: 65, height: 65,}}
                           source={financialCoIcon[numero.charAt(0)]}/>
                  </View>
                  <View style={{marginHorizontal: 15}}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold'
                    }}>{entidad} **** {lastNumbers}</Text>
                    <Text style={{fontSize: 13, color: '#FC9905', fontWeight: 'bold'}}>Cambiar método de pago</Text>
                  </View>
                  <View style={{
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
              :
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('MetodoDePagoSubasta')}>
                <View style={styles.metodoDePagoContainer}>
                  <View style={{marginHorizontal: 15}}>
                    <Image style={{width: 65, height: 30,}}
                           source={bankCoIcon[entidad.toLowerCase()]}/>
                  </View>
                  <View style={{marginHorizontal: 15}}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold'
                    }}>Cuenta {cbu_alias} </Text>
                    <Text style={{fontSize: 13, color: '#FC9905', fontWeight: 'bold'}}>Cambiar método de pago</Text>
                  </View>
                  <View style={{
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
          }
          <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingLeft: 10}}>¿Cuánto Ofertás?</Text>
          <View style={styles.nuevaPuja}>
            <TextInput
              style={styles.nuevaPujaInput}
              placeholder="$0"
              keyboardType={'numeric'}
              textAlign={'center'}
              value={oferta.toString()}
              onChangeText={(_oferta) => checkOferta(_oferta)}
              autoFocus={true}
              maxLength={maxValue.toString().length + 1}
            />
            {
              ofertaMinima ? <Text style={{color: '#FF0000'}}> Oferta mínima $25000</Text>
                : null}
            {
              ofertaMaxima ? <Text style={{color: '#FF0000'}}> Oferta máxima $30000</Text>
                : null
            }


          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Button
              disabled={!allowOferta}
              disabledStyle={{borderColor: '#C4C4C4'}}
              title='Ofertar'
              type='solid'
              titleStyle={{fontWeight: '100'}}
              buttonStyle={{
                backgroundColor: '#FC9905',
                borderRadius: 5,
                height: 45,
                width: 150,
                borderWidth: 1.7,
                borderColor: '#FC9905',
                marginHorizontal: 5
              }}
            />
            <Button
              onPress={() => navigation.goBack()}
              disabledStyle={{borderColor: '#C4C4C4'}}
              title='Cancelar'
              type='solid'
              titleStyle={{fontWeight: '100', color: '#FC9905',}}
              buttonStyle={{
                backgroundColor: '#fafafa',
                borderRadius: 5,
                height: 45,
                width: 150,
                borderWidth: 1.7,
                borderColor: '#FC9905',
                marginHorizontal: 5

              }}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 25,}}>
            <Text style={{textAlign: 'center', fontSize: 12, color: '#B6B6B6', paddingHorizontal: 20}}>
              Al ofertar usted se compromete, en el caso de ganar, a aceptar el cobro automático del monto especificado
              anteriormente.
            </Text>
          </View>
        </View>
      </View>
    </MetodoPagoProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemDescriptionContainer: {
    backgroundColor: '#000',
    minWidth: '100%',
    height: '100%',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 25,
    marginTop: 60,
    marginBottom: 10
  },

  itemCardDescription: {
    backgroundColor: '#FAFAFA',
    padding: 8,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    flexDirection: 'row'
  },

  itemTextContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemTextDescription: {fontSize: 12},

  itemTextPriceContainer: {
    paddingLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#000',
  },

  ofertaContainer: {
    minWidth: '100%',
    height: '74%',
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    bottom: 0,
    paddingRight: 10,
    paddingLeft: 10,
  },

  metodoDePagoContainer: {
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

  nuevaPuja: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nuevaPujaInput: {
    width: '80%',
    fontSize: 50
  },


  btnPuja: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    width: 140
  },
  btnPujaText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },

})

export default NuevaPuja