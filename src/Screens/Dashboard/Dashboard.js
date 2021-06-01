import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { DataContext } from "../../context/DataContext";
import { Icon, Avatar, SearchBar, } from 'react-native-elements';
import { useFonts, CinzelDecorative_400Regular, CinzelDecorative_700Bold, CinzelDecorative_900Black, } from '@expo-google-fonts/cinzel-decorative';
import { Button } from 'react-native-elements/dist/buttons/Button';
import AuctionCard from './AuctionCard';
import ErrorModal from './ErrorModal';

const Dashboard = ({ navigation }) => {

  //Data from context provider
  const { userData, subastas, setSubastas } = useContext(DataContext);

  //Error modal
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
    getSubastas()
  }, [])

  //Fonts
  let [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
  });

  //SearchBar
  const [search, setSearch] = useState('');

  //Filtro por categoria
  const filteredAuctions = search ? subastas.filter((i) => (i.categoriaSubasta.toLowerCase()).includes(search.toLowerCase())) : subastas;

  //Sesion iniciada
  const getSesionIniciada = () => {
    return true;
  }
  const sesionIniciada = getSesionIniciada();

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView vertical showsVerticalScrollIndicator={false} >
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
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                      />
                      <Text style={{ fontSize: 16, textAlign: 'center' }}>Tamara Cabello</Text>
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
                        onPress={() => navigation.push('MetodosPago')} />
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

            <View style={styles.searchBarContainer}>
              <SearchBar
                lightTheme={true}
                searchIcon={{ size: 26 }}
                inputStyle={{ backgroundColor: '#EDEDED', fontSize: 13 }}
                inputContainerStyle={{ borderRadius: 5, width: '85%', height: 35, backgroundColor: '#EDEDED' }}
                containerStyle={{ borderRadius: 5, backgroundColor: '#FFFFFF', shadowColor: '#00000021', elevation: 5, }}
                placeholder="Buscar"
                onChangeText={setSearch}
                value={search}
              />
            </View>

            {
              Object.keys(filteredAuctions).length !== 0 ?

                <View style={styles.auctionsContainer}>
                  {filteredAuctions.map((subasta, i) => (
                    <AuctionCard key={i} {...subasta} navigation={navigation} />
                  ))}
                </View>
                :
                <ErrorModal
                  isVisible={visible}
                  toggleOverlay={toggleOverlay}
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

});


export default Dashboard