import {ISO_8601} from 'moment';
import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Avatar, Button} from 'react-native-elements'
import {apiUrl} from "../../api";

import {DataContext} from "../../context/DataContext";

const HistorialOferta = ({route, navigation}) => {

  const [pujas, setPujas] = useState();
  const {userData} = useContext(DataContext);

  useEffect(() => {
    const getPujas = async () => {
      try {
        let pujas = await fetch(`${apiUrl}/api/pujas/catalogo/${route.params.idProducto}/`);
        pujas = await pujas.json();
        setPujas(pujas)
      } catch (e) {
      }
    }
    getPujas();

  }, [])


  if (pujas) {
    return (
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View>
            <View style={styles.descriptionCatalogo}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Historial de ofertas</Text>
            </View>
          </View>

          <View style={{marginVertical: 30, marginBottom: 50}}>
            <View style={styles.pujasListContainer}>

              <ScrollView vertical showsVerticalScrollIndicator={false}>
                {
                  (pujas.length > 0) ? pujas.map((item, idx) => {

                      let importeToShow = 0
                      const numFormatter = (importe) => {
                        if (importe > 999 && importe < 1000000) return item.importeToShow = (importe / 1000).toFixed(1) + 'K';
                        else if (importe > 1000000) return item.importeToShow = (importe / 1000000).toFixed(1) + 'M';
                        else if (importe < 900) return importe;
                      }

                      numFormatter(item.importe);

                      return (
                        <View style={styles.itemPuja} key={idx}>
                          <Avatar
                            rounded
                            size='medium'
                            source={{
                              uri: `${item.foto}`,
                            }}
                          />
                          {(userData && userData.nombreCompleto === item.nombrePujador) ?
                            <>
                              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Hiciste una oferta por</Text>
                              <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: '#FC9905',
                                padding: 5,
                                borderRadius: 5,
                              }}>{item.importeToShow}</Text>
                            </>
                            :
                            <>
                              <Text style={{fontSize: 16, fontWeight: 'bold',}}>Realiz?? una oferta por</Text>
                              <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                backgroundColor: '#eaeaea',
                                padding: 5,
                                borderRadius: 5,
                                color: 'black'
                              }}>{item.importeToShow}</Text>
                            </>
                          }
                        </View>
                      )
                    })
                    :
                    <View>
                      <Text style={{
                        paddingHorizontal: 5,
                        height: 110,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontSize: 18,
                        fontWeight: 'bold'
                      }}>??Este ??tem no posee ofertas! realice una o espere a que otro usuario lo haga. </Text>
                      <Button
                        disabledStyle={{borderColor: '#C4C4C4'}}
                        title='Pujar por el item'
                        type='solid'
                        titleStyle={{fontWeight: '100'}}
                        buttonStyle={{
                          backgroundColor: '#FC9905',
                          borderRadius: 5,
                          height: 40,
                          borderWidth: 1.7,
                          borderColor: '#FC9905',
                          marginBottom:20
                        }}
                        containerStyle={{width: 300, alignSelf: 'center'}}
                        onPress={() => {
                          navigation.navigate('SubastaScreen', {
                            screen: 'ItemSubasta',
                            params: {
                              idSubasta: route.params.idSubasta,
                              categoriaSubasta: route.params.categoriaSubasta
                            },
                          })
                        }}
                      />
                    </View>


                }
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>

    )
  } else return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', marginHorizontal: 20, fontSize: 20}}>Ha ocurrido un error
        al encontrar el historial. Vuelva a intentarlo m??s tarde.</Text>
      <Image
        style={{marginTop: 10}}
        source={require('../../../assets/imageIcons/catalogoEnConstruccion.png')}
      />
    </View>
  )


};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  descriptionCatalogo: {
    backgroundColor: '#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 100,
    borderRadius: 8,
    height: 125,
    justifyContent: 'center',
    marginBottom: -20
  },

  pujasListContainer: {
    backgroundColor: '#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginHorizontal: 20,
    shadowOpacity: 0.30,
    elevation: 8,
    shadowRadius: 4.65,
    borderRadius: 8,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 20,
  },

  itemPuja: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
})

export default HistorialOferta