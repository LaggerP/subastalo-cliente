import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Divider, Icon} from "react-native-elements";

const CategoriaPerfil = ({navigation}) => {

  return (
    <>
      <View
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fafafa'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            marginTop: '15%',
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            name='arrow-back-outline'
            type='ionicon'
            color='#000'
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={{paddingLeft: 20, paddingTop: 12, fontSize: 18, fontWeight: 'bold'}}>¡Sumá puntos y subí de
            categoría!</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10}}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={26}
            />
            <Text style={{paddingLeft: 5}}>Ofertando en subastas</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10}}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={26}
            />
            <Text style={{paddingLeft: 5}}>Agregando métodos de pago</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10}}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={26}
            />
            <Text style={{paddingLeft: 5}}>Subastando artículos</Text>
          </View>


        </View>
        <View style={styles.miCategoriaContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
            <Icon
              name='star-outline'
              type='ionicon'
              color='#FC9905'
              size={24}
            />
            <Text style={{paddingLeft: 10}}>Mi categoría</Text>

          </View>
          <Divider orientation="horizontal"/>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
            paddingTop: 10
          }}>
            <Text>Grafico de dona</Text>
            <Text style={{fontSize: 18}}>Estás en la categoría <Text style={{color: '#FC9905'}}>Platino</Text></Text>
          </View>


        </View>
        <Text style={{marginRight: 45, marginTop: 22, fontSize: 17, fontWeight: 'bold'}}>Beneficios para las próximas
          categorías</Text>
        <View>
          <ScrollView horizontal
                      showsHorizontalScrollIndicator={true}
          >
            <View style={styles.cardCategoria}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='star-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Común</Text>

              </View>
              <Divider orientation="horizontal"/>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Ofertar en subastas de tu nivel</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Subastar tus productos</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Registrar métodos de pago</Text>
              </View>

            </View>
            <View style={styles.cardCategoria}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='star-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Especial</Text>

              </View>
              <Divider orientation="horizontal"/>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10, color: '#FC9905', fontWeight: 'bold'}}>Ofertar en subastas de igual o
                  menor nivel</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Subastar tus productos</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Registrar métodos de pago</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10, color: '#FC9905', fontWeight: 'bold'}}>2% de descuento en envíos</Text>
              </View>

            </View>
            <View style={styles.cardCategoria}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='star-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Plata</Text>

              </View>
              <Divider orientation="horizontal"/>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Ofertar en subastas de igual o menor nivel</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Subastar tus productos</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Registrar métodos de pago</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10, color: '#FC9905', fontWeight: 'bold'}}>5% de descuento en envíos</Text>
              </View>

            </View>
            <View style={styles.cardCategoria}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='star-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Oro</Text>

              </View>
              <Divider orientation="horizontal"/>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Ofertar en subastas de igual o menor nivel</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Subastar tus productos</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Registrar métodos de pago</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10, color: '#FC9905', fontWeight: 'bold'}}>10% de descuento en envíos</Text>
              </View>

            </View>
            <View style={styles.cardCategoria}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5}}>
                <Icon
                  name='star-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Platino</Text>

              </View>
              <Divider orientation="horizontal"/>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Ofertar en subastas de igual o menor nivel</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Subastar tus productos</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10}}>Registrar métodos de pago</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5}}>
                <Icon
                  name='caret-forward-outline'
                  type='ionicon'
                  color='#FC9905'
                  size={24}
                />
                <Text style={{paddingLeft: 10, color: '#FC9905', fontWeight: 'bold'}}>18% de descuento en envíos</Text>
              </View>

            </View>

          </ScrollView>
        </View>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },

  infoContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '90%',
    height: 170,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  miCategoriaContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    width: '90%',
    height: 140,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  cardCategoria: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    width: 350,
    height: 180,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  }
});

export default CategoriaPerfil