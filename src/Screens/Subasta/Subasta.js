import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, Pressable} from 'react-native';
import {Icon} from 'react-native-elements'
import {DataContext} from "../../context/DataContext";
import SubastaCarousel from "./SubastaCarousel";

const Subasta = ({route, navigation}) => {

  const [item, setItem] = useState(null);
  const [getMorePujas, setGetMorePujas] = useState(false);

  const getItemSubastandose = async () => {
    return await fetch(`http://10.0.2.2:3000/api/subastas/catalogo/${route.params.idSubasta}/item-catalogo`)
      .then((response) => response.json())
      .then((_itemData) => {
        setItem(_itemData)
        setGetMorePujas(true)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getPujas = async () => {
    return await fetch(`http://10.0.2.2:3000/api/pujas/catalogo/${item.idItemCatalogo}/`)
      .then((response) => response.json())
      .then((_newPujas) => {
        setItem({...item, pujas: _newPujas})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getItemSubastandose();
    if (getMorePujas) {
      let interval = setInterval(() => getPujas(), 10000)
      //destroy interval on unmount
      return () => clearInterval(interval)
    }

  }, [])

  if (item) {
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          <SubastaCarousel navigation={navigation}/>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemTitle}>
            Descripción Item
          </Text>
          <View style={styles.itemCardDescription}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTextDescription}>
                {item.descripcionCompleta}
              </Text>
            </View>
            <View style={styles.verticleLine}/>
            <View style={styles.itemTextPriceContainer}>
              <Text style={{fontSize: 12}}>
                Precio Base
              </Text>
              <Text>
                ${item.precioBase}
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

        <View style={styles.pujasListContainer}>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {
              item.pujas.map((item, idx) => {

                const numFormatter = (importe) => {
                  if (importe > 999 && importe < 1000000) return item.importe = (importe / 1000).toFixed(1) + 'K';
                  else if (importe > 1000000) return item.importe = (importe / 1000000).toFixed(1) + 'M';
                  else if (importe < 900) return importe;
                }

                numFormatter(item.importe);

                return (
                  <View style={styles.itemPuja} key={idx}>
                    <Icon
                      name='sc-telegram'
                      type='evilicon'
                      color='#517fa4'
                      reverse
                      size={18}
                    />
                    <Text style={{fontSize: 15,}}>Realizó una oferta</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>${item.importe}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
          <View style={{marginBottom: 8}}>
            <Pressable style={styles.btnPuja} onPress={() => console.log("hola")}>
              <Text style={styles.btnPujaText}>Nueva Oferta</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  catalogoIcono: {
    marginTop: 40,
  },

  imagesContainer: {
    marginTop: 40,
    marginBottom: 390
  },

  itemDescriptionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    minWidth: '100%',
    height: '54%',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '10%',
    marginTop: 10,
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

  itemTextDescription: {fontSize: 12,},

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

  pujasListContainer: {
    minWidth: '100%',
    height: '35%',
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    bottom: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },

  itemPuja: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 8
  },
  btnPuja: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
  },
  btnPujaText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
})

export default Subasta