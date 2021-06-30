import React, { useContext, useEffect, useState } from 'react';
import { Roboto_500Medium, } from '@expo-google-fonts/roboto';
import {
  useFonts,
  CinzelDecorative_400Regular,
  CinzelDecorative_700Bold,
  CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Icon, Avatar, SearchBar, Overlay, CheckBox, Button } from 'react-native-elements';
import { apiUrl } from "../../api";

import { DataContext } from "../../context/DataContext";

import HistorialCard from './HistorialCard';
import ErrorModalHistorial from './ErrorModalHistorial';

const DashboardHistorial = ({navigation}) => {

  const [subastas, setSubastas] = useState([]);
  const [pujas, setPujas] = useState([]);

  const {userData} = useContext(DataContext);
  
  let itemsGanados = pujas.filter(pujas =>pujas.ganador === 'si').length;

  let itemsTotales = [...new Set(pujas.map(a => a.item))].length;

  let itemsParticipados = itemsTotales - itemsGanados;
  
  let datosFiltros;

  const getSubastas = async () => {
  
    return await fetch(`${apiUrl}/api/subastas/cliente/${userData.idCliente}`)
      .then((response) => response.json())
      .then((json) => {
        setSubastas(json.subastas);
      })
      .catch((error) => {
        console.error(error);
        toggleOverlay();
      });
  }

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
    getSubastas();
    getPujas();
    datosFiltros={...subastas,...pujas}
  }, [])

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

   //Checkbox filter & Searchbar
   const [search, setSearch] = useState('');
   const [openedCheck, setOpenedCheck] = useState(false);
   const [closedCheck, setClosedCheck] = useState(false);
   const [filter, setFilterVisible] = useState(false);
   const toggleFilter = () => {
     setFilterVisible(!filter);
   };
   const [filterPosition, setFilterPosition] = useState([
     x = '',
     y = ''
   ]);
   let filteredAuctions = search ? subastas.filter((i) =>
     (i.categoriaSubasta.toLowerCase()).includes(search.toLowerCase()) ||
     (i.nombreSubastador.toLowerCase()).includes(search.toLowerCase()))
     : openedCheck && closedCheck ?
       subastas.filter((i) => (i.estadoSubasta === 'abierta' || 'cerrada'))
       : openedCheck && !closedCheck ?
         subastas.filter((i) => (i.estadoSubasta === 'abierta'))
         : !openedCheck && closedCheck ?
           subastas.filter((i) => (i.estadoSubasta === 'cerrada'))
           :
           subastas.sort((a, b) => a.estadoSubasta.localeCompare(b.estadoSubasta) || a.fechaSubasta.localeCompare(b.fechaSubasta));
 

  const Linea = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ flex: 1, height: 1.5, backgroundColor: '#CACACA', }} />
      </View>
    )
  };

  const goToTop = () => {
    scroll.scrollTo({ x: 0, y: 0, animated: true });
  }

  return (
    <View style={{ flex: 1 }}>
    <ScrollView vertical showsVerticalScrollIndicator={false} ref={(c) => {
      scroll = c
    }}>
      <View style={styles.container}>

        <View style={styles.userCard}>

          <View style={styles.userSection}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                size='large'
                rounded
                source={{
                  uri:
                    userData.foto,
                }}
              />
              <Text style={{
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'Roboto_500Medium'
              }}>{userData.nombreCompleto}</Text>
            </View>
          </View>

          <View style={styles.buttonsSection}>
            <View style={styles.btn}>
              <Text style={styles.buttonText}>{itemsTotales}</Text>
              <Text textBreakStrategy='simple' style={{ fontSize: 12, textAlign: 'center', marginTop: 4 }}>Participaciones</Text>
            </View>

            <View style={styles.btn}>
              <Icon
                raised
                reverse
                name='stats-chart'
                type='ionicon'
                reverseColor='#000000'
                color='#FFCD61'
                size={22}
                onPress={() => navigation.push('HistorialEstadisticas')} />
              <Text style={{ fontSize: 12, textAlign: 'center' }}>Estadísticas</Text>
            </View>

            <View style={styles.btn}>
              <Text style={styles.buttonText}>{itemsGanados}</Text>
              <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 4 }}>Artículos</Text>
              <Text style={{ fontSize: 12, textAlign: 'center' }}>ganados</Text>
            </View>
          </View>

        </View>

        <View style={styles.searchBarContainer} onLayout={e => {
          const layout = e.nativeEvent.layout;
          setFilterPosition({ x: layout.x, y: layout.y })
        }}>
          <View style={{ flexDirection: 'column', flex: 2, }}>
            <SearchBar
              lightTheme={true}
              searchIcon={{ size: 26 }}
              inputStyle={{ backgroundColor: '#EDEDED', fontSize: 13, }}
              inputContainerStyle={{ borderRadius: 5, width: '100%', height: 35, backgroundColor: '#EDEDED', }}
              containerStyle={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: '#FFFFFF',
                shadowColor: '#00000021',
                elevation: 5,
                borderTopWidth: 0,
                borderBottomWidth: 0
              }}
              placeholder="Buscar"
              onChangeText={setSearch}
              value={search}
              platform="default" />
          </View>
          <View style={{
            flexDirection: 'column',
            flex: 0.4,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            backgroundColor: '#FFFFFF',
            shadowColor: '#00000021',
            elevation: 5,
            justifyContent: 'center',
          }}>
            <Icon
              name='options-outline'
              type='ionicon'
              size={29}
              iconStyle={{ alignSelf: 'center', }}
              containerStyle={{ alignSelf: 'center' }}
              onPress={() => {
                goToTop();
                toggleFilter()
              }}
            />
          </View>
        </View>

        <View>
          <Overlay isVisible={filter} onBackdropPress={() => {
            toggleFilter()
          }} overlayStyle={{
            width: 194,
            height: 140,
            padding: 0,
            paddingTop: 8,
            paddingBottom: 10,
            position: 'absolute',
            transform: [{ translateX: (filterPosition.x + 80) }, { translateY: (filterPosition.y - 275) }]
          }}>
            <View style={{ justifyContent: 'flex-start', height: 30, }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, }}>Filtrar por:</Text>
            </View>
            <Linea />
            <CheckBox
              title='En Vivo'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              iconRight={true}
              size={20}
              containerStyle={styles.checkContainer}
              wrapperStyle={{ justifyContent: 'space-between', }}
              onPress={() => {
                setOpenedCheck(!openedCheck)
              }}
              checked={openedCheck}
            />
            <Linea />
            <CheckBox
              title='Próximo'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              iconRight={true}
              size={20}
              containerStyle={styles.checkContainer}
              wrapperStyle={{ justifyContent: 'space-between', }}
              onPress={() => setClosedCheck(!closedCheck)}
              checked={closedCheck}
            />
            <Linea />
          </Overlay>
        </View>

        {
          Object.keys(filteredAuctions).length > 0 ?

            <View style={styles.auctionsContainer}>
              {filteredAuctions.map((subasta, i) => (
                <HistorialCard key={i} {...subasta} navigation={navigation} />
              ))}
            </View>
            :
            <View>
            <View style={styles.noHistorial}>
                  <View style={{ flex: 0.9, flexDirection: 'column', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', fontSize: 17 }}>No existe el historial, haga alguna puja.</Text>
                  </View>
                </View>
            <ErrorModalHistorial
              toggleOverlay={toggleOverlay}
              isVisible={visible}
            />
            </View>
        }
      </View>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 7,

    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginTop: '10%',
    paddingBottom: 10,
    height: 235,
    width: '95%',
  },

  userSection: {
    flex: 1.7,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },

  buttonsSection: {
    flex: 1.3,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 20,
    justifyContent: 'center',
  },

  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 85,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFCD61',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 8,
  },

  searchBarContainer: {
    flexDirection: 'row',
    marginTop: '3%',
    paddingBottom: 10,
    width: '95%',
  },

  auctionsContainer: {
    flex: 1,
    width: '95%',
    marginTop: 10,
    height: '100%'
  },

  checkContainer: {
    width: '100%',
    backgroundColor: '#EDEDED',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },

  noHistorial: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 7,

    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
    height: 100,
    width: 375,
  }

});

export default DashboardHistorial;