import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, Icon, Badge } from "react-native-elements";

//Context
import { DataContext } from "../../context/DataContext";

const CategoriaPerfil = ({ navigation }) => {

  const { userData } = useContext(DataContext);

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fafafa' }}>
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
          <Text style={{ paddingTop: 12, fontSize: 18, fontWeight: 'bold', alignSelf: 'center', }}>¡Sumá puntos y subí de categoría!</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 15 }}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={25}
            />
            <Text style={{ paddingLeft: 5 }}>Ofertando en subastas</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 10 }}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={25}
            />
            <Text style={{ paddingLeft: 5 }}>Agregando métodos de pago</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 10, paddingBottom: 15, }}>
            <Icon
              name='checkmark-circle-outline'
              type='ionicon'
              color='#FC9905'
              size={25}
            />
            <Text style={{ paddingLeft: 5 }}>Subastando artículos</Text>
          </View>
        </View>

        <View style={styles.miCategoriaContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
            <Icon
              name='star'
              type='feather'
              color='#FC9905'
              iconStyle={{
                borderRadius: 15,
                borderWidth: 2,
                borderColor: '#FC9905',
                textAlign: 'center',
                textAlignVertical: 'center',
                padding: 1.5,
              }}
              containerStyle={{ alignSelf: 'center', }}
              size={15} />
            <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'center', }}>Mi categoría</Text>
          </View>

          <Divider orientation="horizontal" />

          <View style={{ flexDirection: 'row', flex: 1 }}>

            <View style={{ flexDirection: 'column', flex: 0.3, justifyContent: 'center', }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                <Text>Grafico de dona</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column', flex: 0.7, justifyContent: 'center', }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontSize: 17, paddingLeft: 5 }}>Estás en la categoría <Text style={{ color: '#FC9905', textTransform: 'capitalize' }}>{userData.categoria}</Text></Text>
              </View>
            </View>

          </View>
        </View>

        <Text style={{ marginRight: 45, marginTop: 22, fontSize: 17, fontWeight: 'bold' }}>Beneficios para las próximas categorías</Text>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>

            <View style={styles.cardCategoria}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
                <Icon
                  name='star'
                  type='feather'
                  color='#FC9905'
                  iconStyle={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#FC9905',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 1.5,
                  }}
                  containerStyle={{ alignSelf: 'center', }}
                  size={15} />
                <Text style={{ paddingLeft: 10 }}>Común</Text>
              </View>

              <Divider orientation="horizontal" />

              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Ofertar en subastas de tu nivel</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Subastar tus productos</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Registrar métodos de pago</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardCategoria}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
                <Icon
                  name='star'
                  type='feather'
                  color='#FC9905'
                  iconStyle={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#FC9905',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 1.5,
                  }}
                  containerStyle={{ alignSelf: 'center', }}
                  size={15} />
                <Text style={{ paddingLeft: 10 }}>Especial</Text>
              </View>

              <Divider orientation="horizontal" />

              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10, color: '#FC9905', fontWeight: 'bold' }}>Ofertar en subastas de igual o menor nivel</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Subastar tus productos</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Registrar métodos de pago</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10, color: '#FC9905', fontWeight: 'bold' }}>2% de descuento en envíos</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardCategoria}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
                <Icon
                  name='star'
                  type='feather'
                  color='#FC9905'
                  iconStyle={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#FC9905',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 1.5,
                  }}
                  containerStyle={{ alignSelf: 'center', }}
                  size={15} />
                <Text style={{ paddingLeft: 10 }}>Plata</Text>
              </View>

              <Divider orientation="horizontal" />

              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5 }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Ofertar en subastas de igual o menor nivel</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5 }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Subastar tus productos</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5 }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Registrar métodos de pago</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 3, paddingBottom: 5 }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10, color: '#FC9905', fontWeight: 'bold' }}>5% de descuento en envíos</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardCategoria}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
                <Icon
                  name='star'
                  type='feather'
                  color='#FC9905'
                  iconStyle={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#FC9905',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 1.5,
                  }}
                  containerStyle={{ alignSelf: 'center', }}
                  size={15} />
                <Text style={{ paddingLeft: 10 }}>Oro</Text>
              </View>

              <Divider orientation="horizontal" />

              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Ofertar en subastas de igual o menor nivel</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Subastar tus productos</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Registrar métodos de pago</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10, color: '#FC9905', fontWeight: 'bold' }}>10% de descuento en envíos</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardCategoria}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, paddingBottom: 5 }}>
                <Icon
                  name='star'
                  type='feather'
                  color='#FC9905'
                  iconStyle={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#FC9905',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 1.5,
                  }}
                  containerStyle={{ alignSelf: 'center', }}
                  size={15} />
                <Text style={{ paddingLeft: 10 }}>Platino</Text>
              </View>

              <Divider orientation="horizontal" />

              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Ofertar en subastas de igual o menor nivel</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Subastar tus productos</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10 }}>Registrar métodos de pago</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                  <Badge badgeStyle={{ backgroundColor: '#FC9905' }} containerStyle={{ paddingLeft: 5 }} />
                  <Text style={{ paddingLeft: 10, color: '#FC9905', fontWeight: 'bold' }}>18% de descuento en envíos</Text>
                </View>
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