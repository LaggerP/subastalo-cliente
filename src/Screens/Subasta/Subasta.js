import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, Pressable} from 'react-native';
import {Icon} from 'react-native-elements'
import {DataContext} from "../../context/DataContext";
import SubastaCarousel from "./SubastaCarousel";

const Subasta = ({navigation}) => {

  const getItemSubastandose = () => {
  }

  useEffect(() => {
    getItemSubastandose()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <SubastaCarousel navigation={navigation}/>
      </View>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.itemTitle}>
          Nombre Item
        </Text>
        <View style={styles.itemCardDescription}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </Text>
          </View>
          <View style={styles.verticleLine}/>
          <View style={styles.itemTextPriceContainer}>
            <Text style={{fontSize: 12}}>
              Precio Base
            </Text>
            <Text>
              $1000
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
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>
          <View style={styles.itemPuja}>
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
              reverse
              size={18}
            />
            <Text style={{fontSize: 15, paddingLeft: '12%', paddingRight: '12%'}}>Realizó una oferta</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingRight: 15}}>$27.5K</Text>
          </View>


        </ScrollView>
        <View style={{marginBottom: 8}}>
          <Pressable style={styles.btnPuja} onPress={() => console.log("hola")}>
            <Text style={styles.btnPujaText}>Nueva Oferta</Text>
          </Pressable>
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

  catalogoIcono:{
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  btnPuja: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    paddingVertical: 15,
    paddingHorizontal: 32,
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