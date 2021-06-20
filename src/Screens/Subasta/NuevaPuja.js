import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Pressable} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import CountDown from "react-native-countdown-component";

// Components
import {ModalSubasta} from "../../Components/Subasta/ModalSubasta";

// Context
import {MetodoPagoContext} from "../../context/MetodoPagoContext";
import {DataContext} from "../../context/DataContext";
import {PujasContext} from "../../context/PujasContext";

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
const financialCoIcon = {
  4: visaIcon,
  5: masterCardIcon
}
const bankCoIcon = {
  'bbva': BBVALogo,
  'santander': santanderLogo,
  'galicia': galiciaLogo,
}

const NuevaPuja = ({route, navigation}) => {

  //Data from Data Context
  const {userData} = useContext(DataContext);
  //Data from Pujas Context
  const {item, newPuja} = useContext(PujasContext);
  const {descripcionCompleta, precioBase, idItemCatalogo, idSubasta, pujas} = item
  //Data from Metodo Pago Context
  const {metodoPagoElegido} = useContext(MetodoPagoContext);
  const {idTarjeta, numero, entidad, lastNumbers, cbu_alias} = metodoPagoElegido

  const [oferta, setOferta] = useState('');
  const [ofertaMinima, setOfertaMinima] = useState(false);
  const [ofertaMaxima, setOfertaMaxima] = useState(false);
  const [allowOferta, setAllowOferta] = useState(false);
  const [showModal, setShowModal] = useState({
    visible: false,
    title: '',
    msg: '',
    icon: ''
  });
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  /**
   * El monto de la puja nunca puede ser menor al 1% del valor del valor base del bien,
   * y excepto en las subastas del categorías oro y platino, el valor del pujo no puede
   * exceder el 20% del valor actual (el del último pujo).
   */
  let precioActual = pujas.length > 0 ? pujas[0].importe : precioBase
  let minValue = route.params.categoriaSubasta !== 'Platino' || route.params.categoriaSubasta !== 'Oro' ? (precioActual + precioActual * 1 / 100) : precioActual;
  let maxValue = precioActual + precioActual * 20 / 100;

  const checkOferta = async (_oferta) => {
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

  const newOferta = async (_oferta) => {
    setSpinnerLoading(true)
    let oferta = {
      idSubasta: idSubasta,
      idCliente: userData.idCliente,
      numeroPostor: 1,
      importe: parseInt(_oferta, 10),
      idItem: idItemCatalogo,
    }
    const puja = await newPuja(oferta);
    if (puja.status === 201) {
      setShowModal({
        visible: true,
        title: '¡Oferta exitosa!',
        msg: 'Podrá visualizar su oferta en la lista. Recuerde que el artículo no será suyo hasta ser la oferta más alta' +
          ' al finalizar el tiempo.',
        icon: 'nuevaOferta'
      })
    } else if(puja.existe) {
      setShowModal({
        visible: true,
        title: '¡Oferta existente!',
        msg: 'La oferta que usted realizó ya existe, por favor pruebe con otro importe mayor!',
        icon: 'subastaError'
      })
    } else if (puja.ultima){
      setShowModal({
        visible: true,
        title: '¡No puede ofertar de manera consecutiva!',
        msg: 'La oferta que usted hizo es la última registrada. Por favor, espere a que otro participante oferte para' +
          ' volver a ofertar!',
        icon: 'subastaError'
      })
    }
    setSpinnerLoading(false)
  }

  return (
    <View style={styles.container}>
      <ModalSubasta modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>
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
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              Precio Base
            </Text>
            <Text>
              {precioBase}
            </Text>
            <Text style={{fontSize: 12, paddingBottom: 2, fontWeight: 'bold'}}>
              Tiempo restante
            </Text>
            <CountDown
              until={route.params.clock}
              digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FC9905'}}
              separatorStyle={{color: '#000'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
              size={12}
            />
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
                  }}>{entidad.toUpperCase()} **** {lastNumbers}</Text>
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
            maxLength={maxValue.toString().length}
          />
          {
            ofertaMinima ? <Text style={{color: '#FF0000'}}> Oferta mínima ${minValue}</Text>
              : null}
          {
            ofertaMaxima ? <Text style={{color: '#FF0000'}}> Oferta máxima ${maxValue}</Text>
              : null
          }

        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button
            onPress={() => newOferta(oferta)}
            disabled={!allowOferta}
            disabledStyle={{borderColor: '#C4C4C4'}}
            title='Ofertar'
            loading={spinnerLoading}
            loadingProps={{
              color: '#fafafa',
              size: 35
            }}
            loadingStyle={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
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
            Al ofertar usted se compromete, en el caso de ganar, en aceptar el cobro automático del monto especificado.
          </Text>
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
    marginLeft: 25,
    marginTop: 60,
    marginBottom: 8
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