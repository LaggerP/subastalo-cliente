import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Pressable} from 'react-native';
import {Button, Icon} from 'react-native-elements'

import visaIcon from '../../../assets/cardIcons/visa.png'


const NuevaPuja = ({route, navigation}) => {

  const {descripcionCompleta, precioBase} = route.params.item;

  const [oferta, setOferta] = useState(0);
  const [ofertaMinima, setOfertaMinima] = useState(false);
  const [ofertaMaxima, setOfertaMaxima] = useState(false);
  const [allowOferta, setAllowOferta] = useState(false);

  const minValue = 25000;
  const maxValue = 30000;
  const checkOferta = (_oferta) => {
    if (_oferta > minValue && _oferta < maxValue) {
      setOferta(_oferta);
      setOfertaMinima(false);
      setOfertaMaxima(false);
      setAllowOferta(true)
    } else if (_oferta > maxValue) {
      setOfertaMaxima(true);
      setOfertaMinima(false);
      setAllowOferta(false);
      setOferta(0);
    } else if (_oferta < minValue) {
      setOfertaMaxima(false);
      setOfertaMinima(true);
      setAllowOferta(false);
      setOferta(0);
    } else {
      setAllowOferta(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.itemTitle}>
          Descripción Item
        </Text>
        <View style={styles.itemCardDescription}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextDescription}>
              {descripcionCompleta} hola
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
        <TouchableWithoutFeedback
          onPress={() => console.log(":)")}
        >
          <View style={styles.metodoDePagoContainer}>

            <View style={{marginHorizontal: 15}}>
              <Image
                style={{width: 65, height: 65,}}
                source={visaIcon}
              />
            </View>
            <View style={{marginHorizontal: 15}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Visa Débito **** 1234</Text>
              <Text style={{fontSize: 13, color: '#FC9905', fontWeight: 'bold'}}>Cambiar medio de pago</Text>
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
        <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingLeft: 10}}>¿Cúanto Ofertás?</Text>
        <View style={styles.nuevaPuja}>
          <TextInput
            style={styles.nuevaPujaInput}
            placeholder="$0"
            keyboardType={'numeric'}
            textAlign={'center'}
            value={oferta}
            onChangeText={checkOferta}
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
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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
            onPress={() => console.log(oferta)}
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
        </View>
      </View>
    </View>
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
    marginLeft: '10%',
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
    display: 'flex',
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
    display: 'flex',
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