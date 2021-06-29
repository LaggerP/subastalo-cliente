import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import { apiUrl } from "../../api";
import CatalogoCarousel from "../../Components/Catalogo/CatalogoCarousel";

// Context
import {DataContext} from "../../context/DataContext";

const HistorialCatalogo = ({route, navigation}) => {

  const [catalogo, setCatalogo] = useState();
  const {sesionIniciada, userData} = useContext(DataContext);

  const [pujas, setPujas] = useState([]);

  let itemsGanados = pujas.filter(pujas =>pujas.ganador === 'si')

  const getPujas = async () => {
    return await fetch(`${apiUrl}/api/historial/${userData.idCliente}`)
    .then((response) => response.json())
    .then((json) => {
      setPujas(json.pujas)
    })
    .catch((error) => {
      console.error(error);
      toggleOverlay();
    })
  }

  useEffect(() => {
    const getCatalogo = async () => {
      try {
        let catalogo = await fetch(`${apiUrl}/api/subastas/catalogo/${route.params.idSubasta}/`);
        catalogo = await catalogo.json();
        setCatalogo(catalogo)
      } catch (e) {
      }
    }
    getCatalogo();
    getPujas();
  }, [])


  if (catalogo) {
    return (
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View>
            <View style={styles.descriptionCatalogo}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Catálogo</Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                {catalogo[0].descripcion}
              </Text>
            </View>
          </View>

          <View style={{marginVertical: 30, marginBottom: 50}}>
            {
              catalogo.map((item, idx) => {
                let cantGanada = itemsGanados.filter(itemsGanados => itemsGanados.item === item.idProducto).length
                let itemCatalogoStyle;
                if (cantGanada === 1) {
                  itemCatalogoStyle = styles.itemCatalogoGanado
                }
                else {
                  itemCatalogoStyle = styles.itemCatalogo
                }
                return (
                  <View style={itemCatalogoStyle} key={idx}>
                  <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 10, fontWeight: 'bold'}}>{item.descripcionCatalogo}</Text>
                  <Text
                      style={{fontSize: 17, paddingLeft: 15, paddingTop:10}}>{sesionIniciada ? '$' + item.precioBase : '$***'} - <Text
                      style={{fontSize: 17}}>{item.disponible === 'si' ? 'Item disponible' : 'Item no disponible'}</Text>
                  </Text>
                    <CatalogoCarousel images={catalogo} fotos={item.fotos}/>
                    <Text style={{fontSize: 15, paddingLeft: 15, paddingTop: 10}}>Dueño/a: {item.duenioProducto}</Text>
                    <Text
                      style={{fontSize: 15, paddingLeft: 15, paddingTop: 10}}>Categoría: {item.categoriaProducto}</Text>
                    <Text style={{fontSize: 17, color: '#FC9905', alignSelf:'flex-end', marginRight:20}} onPress={() => navigation.push('HistorialOferta', {idProducto: item.idProducto})}>Ver detalles</Text>
                  </View>
                )
              })
            }

          </View>
        </ScrollView>
      </View>

    )
  } else return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', marginHorizontal: 20, fontSize: 20}}>Ha ocurrido un error al encontrar el historial. Vuelva a intentarlo más tarde.</Text>
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

  itemCatalogo: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: '#fafafa',
    height: 550,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    elevation: 8,
    borderRadius: 8,
  },
  itemCatalogoGanado: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: '#fafafa',
    height: 550,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    elevation: 8,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FC9905'
  },

})

export default HistorialCatalogo