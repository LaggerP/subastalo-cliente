import React, { useContext, useEffect, useState } from 'react';
import { Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { useFonts, CinzelDecorative_400Regular, CinzelDecorative_700Bold, CinzelDecorative_900Black, } from '@expo-google-fonts/cinzel-decorative';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { Icon, Avatar, SearchBar, Overlay, CheckBox, Button } from 'react-native-elements';

//Provider
import { DataContext } from "../../context/DataContext";

// Components
import AuctionCard from './AuctionCard';
import ErrorModal from './ErrorModal';

const Dashboard = ({ navigation }) => {

  //Data from context provider
  const { userData, subastas, setSubastas } = useContext(DataContext);

  const getSubastas = async () => {
    return await fetch('http://10.0.2.2:3000/api/subastas')
      .then((response) => response.json())
      .then((json) => {
        setSubastas(json.subastas);
      })
      .catch((error) => {
        console.error(error);
        toggleOverlay();
      });
  }

  useEffect(() => {
    getSubastas();
  }, [])

  //Error modal
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
      subastas.filter((i) => (i.estadoSubasta == 'abierta' || 'cerrada'))
      : openedCheck && !closedCheck ?
        subastas.filter((i) => (i.estadoSubasta == 'abierta'))
        : !openedCheck && closedCheck ?
          subastas.filter((i) => (i.estadoSubasta == 'cerrada'))
          :
          subastas.sort((a, b) => (a.estadoSubasta > b.estadoSubasta) ? 1 : -1)
    ;

  //Fonts
  let [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
    Roboto_500Medium,
  });

  //Sesion iniciada
  const getSesionIniciada = () => {
    return true;
  }
  const sesionIniciada = getSesionIniciada();

  const goToTop = () => {
    scroll.scrollTo({ x: 0, y: 0, animated: true });
  }

  //Linea
  const Linea = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ flex: 1, height: 1.5, backgroundColor: '#CACACA', }} />
      </View>
    )
  };

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView vertical showsVerticalScrollIndicator={false} ref={(c) => { scroll = c }}>
          <View style={styles.container} >

            {
              sesionIniciada ?
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
                      <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Roboto_500Medium' }}>{userData.nombreCompleto}</Text>
                    </View>
                  </View>


                  <View style={styles.buttonsSection}>
                    <View style={styles.btn}>
                      <Icon
                        raised
                        reverse
                        name='person-outline'
                        type='ionicon'
                        reverseColor='#000000'
                        color='#FFCD61'
                        size={22}
                        onPress={() => navigation.push('Perfil')} />
                      <Text textBreakStrategy='simple' style={{ fontSize: 12, textAlign: 'center' }}>Mi Perfil</Text>
                    </View>

                    <View style={styles.btn}>
                      <Icon
                        raised
                        reverse
                        name='time-outline'
                        type='ionicon'
                        reverseColor='#000000'
                        color='#FFCD61'
                        size={22}
                        onPress={() => navigation.push('Perfil')} />

                      <Text style={{ fontSize: 12, textAlign: 'center' }}>Historial</Text>

                    </View>

                    <View style={styles.btn}>
                      <Icon
                        raised
                        reverse
                        name='archive-outline'
                        type='ionicon'
                        reverseColor='#000000'
                        color='#FFCD61'
                        size={22}
                        onPress={() => navigation.push('Perfil')} />
                      <Text style={{ fontSize: 12, textAlign: 'center' }}>Mis</Text>
                      <Text style={{ fontSize: 12, textAlign: 'center' }}>Productos</Text>
                    </View>

                    <View style={styles.btn}>
                      <Icon
                        raised
                        reverse
                        name='wallet-outline'
                        type='ionicon'
                        reverseColor='#000000'
                        color='#FFCD61'
                        size={22}
                        onPress={() => navigation.push('Perfil')} />
                      <Text style={{ fontSize: 12, textAlign: 'center' }}>Métodos de</Text>
                      <Text style={{ fontSize: 12, textAlign: 'center' }}>Pago</Text>
                    </View>
                  </View>

                </View>

                :

                <View style={styles.bannerApp}>
                  <Text style={{ fontSize: 40, color: '#FC9905', fontFamily: 'CinzelDecorative_400Regular' }}>Subastalo</Text>
                </View>
            }

            <View style={styles.searchBarContainer} onLayout={e => { const layout = e.nativeEvent.layout; setFilterPosition({ x: layout.x, y: layout.y }) }}>
              <View style={{ flexDirection: 'column', flex: 2, }}>
                <SearchBar
                  lightTheme={true}
                  searchIcon={{ size: 26 }}
                  inputStyle={{ backgroundColor: '#EDEDED', fontSize: 13, }}
                  inputContainerStyle={{ borderRadius: 5, width: '100%', height: 35, backgroundColor: '#EDEDED', }}
                  containerStyle={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: '#FFFFFF', shadowColor: '#00000021', elevation: 5, borderTopWidth: 0, borderBottomWidth: 0 }}
                  placeholder="Buscar"
                  onChangeText={setSearch}
                  value={search}
                />
              </View>
              <View style={{ flexDirection: 'column', flex: 0.4, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: '#FFFFFF', shadowColor: '#00000021', elevation: 5, justifyContent: 'center', }}>
                <Icon
                  name='options-outline'
                  type='ionicon'
                  size={29}
                  iconStyle={{ alignSelf: 'center', }}
                  containerStyle={{ alignSelf: 'center' }}
                  onPress={() => { goToTop(); toggleFilter() }}
                />
              </View>
            </View>

            <View>
              <Overlay isVisible={filter} onBackdropPress={() => { toggleFilter() }} overlayStyle={{ width: 194, height: 140, padding: 0, paddingTop: 8, paddingBottom: 10, position: 'absolute', transform: [{ translateX: (filterPosition.x + 80) }, { translateY: (filterPosition.y - 275) }] }}>
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
                  onPress={() => { setOpenedCheck(!openedCheck) }}
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
                    <AuctionCard key={i} {...subasta} navigation={navigation} />
                  ))}
                </View>
                :
                <ErrorModal
                  toggleOverlay={toggleOverlay}
                  isVisible={visible}
                />
            }

          </View>

        </ScrollView>
        {
          !sesionIniciada ?
            <View style={styles.footerApp}>
              <Button
                title='Ingresar'
                type='solid'
                titleStyle={{ color: '#000000', fontFamily: 'CinzelDecorative_700Bold' }}
                buttonStyle={{ backgroundColor: '#FFAE00', borderRadius: 10, height: 42, width: 125, borderColor: '#FFAE00' }}
                containerStyle={{ width: 145, alignSelf: 'flex-end', }}
              />
            </View>
            : null
        }

      </View>
    )
  }
};

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

  bannerApp: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 7,

    flex: 1,
    backgroundColor: '#14181B',
    width: '100%',
    height: 73,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },

  footerApp: {
    backgroundColor: '#14181B',
    width: '100%',
    height: 67,
    justifyContent: 'center',
  },

  checkContainer: {
    width: '100%',
    backgroundColor: '#EDEDED',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },

});


export default Dashboard