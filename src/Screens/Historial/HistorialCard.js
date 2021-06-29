import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {Button, Badge, Overlay} from 'react-native-elements'
import Moment from 'moment';
import {DataContext} from "../../context/DataContext";


const HistorialCard = ({
                       idSubasta,
                       fechaSubasta,
                       horaSubasta,
                       categoriaSubasta,
                       navigation
                     }) => {

  const Strong = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


  //Error categoria modal
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (

    <View style={styles.auctionCard}>

      <View style={{flex: 0.8, flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row',}}>
            <Text style={{fontSize: 20}}>Categoría</Text>
            <Badge containerStyle={{alignSelf: 'center', marginLeft: 10, marginRight: 10}} status="warning"/>
            <Text style={{fontSize: 20}}>{categoriaSubasta}</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 1.5, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text
            style={{fontSize: 13, marginBottom: 1,}}><Strong>Fecha:</Strong> {Moment(fechaSubasta).format('DD/MM/YYYY')}
          </Text>
          <Text style={{fontSize: 13, marginBottom: 1,}}><Strong>Hora:</Strong> {Moment(horaSubasta).format('HH:mm')}
          </Text>
        </View>
    </View>

    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
        <Button
            title='Ver ofertas'
            type='outline'
            buttonStyle={{borderRadius: 5, borderWidth: 1.7, borderColor: '#FC9905', height: 35}}
            titleStyle={{color: '#FC9905'}}
            containerStyle={{width: 165, alignSelf: 'flex-end'}}
            onPress={() => navigation.push('HistorialCatalogo', {idSubasta: idSubasta})}
        />
        </View>
    </View>

  )
};

const styles = StyleSheet.create({
  auctionsContainer: {
    flex: 1,
    width: '95%',
    marginTop: 10,
  },

  auctionCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 7,

    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    height: 165,
    padding: 13,
    marginBottom: 15
  },

  containerModal: {
    width: '95%',
    height: 300,
    borderRadius: 10,
  },

  title: {
    fontSize: 38,
    textAlign: 'center'
  },

  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
  },

});


export default HistorialCard