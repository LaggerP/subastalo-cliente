import React, { useContext, useEffect, useState } from 'react';
import { Roboto_500Medium, } from '@expo-google-fonts/roboto';
import {
  useFonts,
  CinzelDecorative_400Regular,
  CinzelDecorative_700Bold,
  CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { Icon, Avatar, SearchBar, Overlay, CheckBox, Button, FAB } from 'react-native-elements';
import { apiUrl } from "../../api";

//Provider
import { DataContext } from "../../context/DataContext";
import { ProductosContext } from "../../context/ProductosContext";

// Components
import ProductCard from '../../Components/Producto/ProductCard';
import Loading from "../../Components/Loading/Loading";

const MisProductos = ({ navigation }) => {

  //Data from context provider
  const { userData } = useContext(DataContext);
  const { productos, setProductos } = useContext(ProductosContext);

  //Error modal
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getProductos = async () => {
    return await fetch(`${apiUrl}/api/productos/cliente/${userData.idCliente}`)
      .then((response) => response.json())
      .then((json) => {
        setProductos(json.productos);
      })
      .catch((e) => {
        console.log(e);
        toggleOverlay();
      });
  }

  const estadoProductos = () => {
    let publicados = productos.length;
    let aceptados = 0;
    let rechazados = 0;
    let pendientes = 0;
    productos.forEach(i => {
      if (i.estado === 'aceptado') {
        aceptados = aceptados + 1;
      }
      else if (i.estado === 'rechazado') {
        rechazados = rechazados + 1;
      }
      else if (i.estado === 'pendiente') {
        pendientes = pendientes + 1;
      }
    });
    return { publicados, aceptados, rechazados, pendientes };
  }

  //Checkbox filter & Searchbar
  const [search, setSearch] = useState('');
  const [check, setCheck] = useState({
    aceptado: false,
    rechazado: false,
    pendiente: false,
  });
  const [filter, setFilterVisible] = useState(false);
  const toggleFilter = () => {
    setFilterVisible(!filter);
  };
  const [filterPosition, setFilterPosition] = useState([
    x = '',
    y = ''
  ]);

  //Filtro 
  let filteredProducts = search ? productos.filter((i) =>
    (i.descripcionCatalogo.toLowerCase()).includes(search.toLowerCase()) ||
    (i.descripcionCompleta.toLowerCase()).includes(search.toLowerCase()))
    : check.pendiente && check.aceptado && check.rechazado ?
      productos.filter((i) => (i.estado === 'pendiente' || i.estado === 'aceptado' || i.estado === 'rechazado'))
      : check.pendiente && check.aceptado && !check.rechazado ?
        productos.filter((i) => (i.estado === 'pendiente' || i.estado === 'aceptado'))
        : check.pendiente && !check.aceptado && check.rechazado ?
          productos.filter((i) => (i.estado === 'pendiente' || i.estado === 'rechazado'))
          : !check.pendiente && check.aceptado && check.rechazado ?
            productos.filter((i) => (i.estado === 'aceptado' || i.estado === 'rechazado'))
            : !check.pendiente && !check.aceptado && check.rechazado ?
              productos.filter((i) => (i.estado === 'rechazado'))
              : !check.pendiente && check.aceptado && !check.rechazado ?
                productos.filter((i) => (i.estado === 'aceptado'))
                : check.pendiente && !check.aceptado && !check.rechazado ?
                  productos.filter((i) => (i.estado === 'pendiente'))
                  : productos.sort((a, b) => a.estado.localeCompare(b.estado) || a.fecha.localeCompare(b.fecha));

  //Fonts
  let [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
    Roboto_500Medium,
  });

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

  useEffect(() => {
    getProductos();
    return () => { }
  }, [])

  if (!fontsLoaded) {
    return <Loading color="white" />;
  } else {
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
                  <Button
                    disabled={true}
                    title={estadoProductos().publicados.toString()}
                    disabledTitleStyle={{ color: 'black' }}
                    disabledStyle={{ backgroundColor: '#FFCD61', borderRadius: 50, height: 55, width: 55, marginBottom: 5 }}
                  />
                  <Text textBreakStrategy='simple' style={{ fontSize: 12, textAlign: 'center' }}>Publicados</Text>
                </View>

                <View style={styles.btn}>
                  <Button
                    disabled={true}
                    title={estadoProductos().aceptados.toString()}
                    disabledTitleStyle={{ color: 'black' }}
                    disabledStyle={{ backgroundColor: '#FFCD61', borderRadius: 50, height: 55, width: 55, marginBottom: 5 }}
                  />
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Aceptados</Text>

                </View>

                <View style={styles.btn}>
                  <Button
                    disabled={true}
                    title={estadoProductos().rechazados.toString()}
                    disabledTitleStyle={{ color: 'black' }}
                    disabledStyle={{ backgroundColor: '#FFCD61', borderRadius: 50, height: 55, width: 55, marginBottom: 5 }}
                  />
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Rechazados</Text>
                </View>

                <View style={styles.btn}>
                  <Button
                    disabled={true}
                    title={estadoProductos().pendientes.toString()}
                    disabledTitleStyle={{ color: 'black' }}
                    disabledStyle={{ backgroundColor: '#FFCD61', borderRadius: 50, height: 55, width: 55, marginBottom: 5 }}
                  />
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Pendientes</Text>
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
                  onChangeText={(text) => { setSearch(text) }}
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
                height: 180,
                padding: 0,
                paddingTop: 8,
                paddingBottom: 10,
                position: 'absolute',
                transform: [{ translateX: (filterPosition.x + 80) }, { translateY: (filterPosition.y - 250) }]
              }}>
                <View style={{ justifyContent: 'flex-start', height: 30, }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, }}>Filtrar por:</Text>
                </View>
                <Linea />
                <CheckBox
                  title='Aceptados'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  iconRight={true}
                  size={20}
                  containerStyle={styles.checkContainer}
                  wrapperStyle={{ justifyContent: 'space-between', }}
                  onPress={() => {
                    setCheck({ ...check, aceptado: !check.aceptado })
                  }}
                  checked={check.aceptado}
                />
                <Linea />
                <CheckBox
                  title='Rechazados'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  iconRight={true}
                  size={20}
                  containerStyle={styles.checkContainer}
                  wrapperStyle={{ justifyContent: 'space-between', }}
                  onPress={() => setCheck({ ...check, rechazado: !check.rechazado })}
                  checked={check.rechazado}
                />
                <Linea />
                <CheckBox
                  title='Pendientes'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  iconRight={true}
                  size={20}
                  containerStyle={styles.checkContainer}
                  wrapperStyle={{ justifyContent: 'space-between', }}
                  onPress={() => setCheck({ ...check, pendiente: !check.pendiente })}
                  checked={check.pendiente}
                />
                <Linea />
              </Overlay>
            </View>

            {
              (Object.keys(filteredProducts).length !== 0) ?

                <View style={styles.auctionsContainer}>
                  {filteredProducts.map((producto, i) => (
                    <ProductCard key={i} {...producto} navigation={navigation} />
                  ))}
                </View>
                :
                <View style={styles.noProducts}>
                  <View style={{ flex: 0.9, flexDirection: 'column', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', fontSize: 17 }}>No existen productos</Text>
                  </View>
                </View>
            }
          </View>
        </ScrollView>

        <FAB
          color='#FFCD61'
          icon={{ type: 'feather', name: 'plus', }}
          buttonStyle={{ borderRadius: 50 }}
          style={{
            position: 'absolute',
            bottom: 25,
            right: 20,
          }}
        />

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
    flex: 1.8,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },

  buttonsSection: {
    flex: 1.1,
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
    marginTop: 30,
    marginBottom: 15,
  },

  footerApp: {
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

  noProducts: {
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
    width: '95%',
  }

});


export default MisProductos