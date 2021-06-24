import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements'
import CountDown from 'react-native-countdown-component';
import {apiUrl} from "../../api";

//Context
import {PujasContext} from "../../context/PujasContext";
// Components
import SubastaCarousel from '../../Components/Subasta/SubastaCarousel';
import {ModalSubasta} from "../../Components/Subasta/ModalSubasta";
import {DataContext} from "../../context/DataContext";
import {MetodoPagoContext} from "../../context/MetodoPagoContext";

const ItemSubasta = ({route, navigation}) => {

  const [timerClock, setTimerClock] = useState(60*20);
  const [loading, setLoading] = useState(true);
  const [intervalStatus, setIntervalStatus] = useState(true);
  const [showModal, setShowModal] = useState({
    visible: false,
    title: '¡Ups!',
    msg: 'Ha ocurrido un error al encontrar el ítem que está subastándose. Vuelva a intentarlo' +
      ' mas tarde',
    icon: 'subastaError'
  });

  // Pujas Context
  const {getPujas, setItem, item, downCountClock, socket} = useContext(PujasContext);
  // User Context
  const {userData} = useContext(DataContext);
  // Metodos de pago Context
  const {metodosDePago} = useContext(MetodoPagoContext);

  socket.on('pujas', async data => {
    await getPujas()
    if (data.reload === true && item) {
      setTimerClock(calculateClock(item.pujas[0].horario))
    }
  })



  const calculateClock = (date) => {
    let actualDate = new Date()
    let aH = actualDate.getUTCHours() - 3;
    let aM = actualDate.getUTCMinutes();
    let aS = actualDate.getUTCSeconds();

    let pujaDate = new Date(date);
    let pH = pujaDate.getUTCHours(); // Hours
    let pM = pujaDate.getUTCMinutes();
    let pS = pujaDate.getUTCSeconds();

    return 60 * (aM - pM)
  }


  const getItemSubastandose = async (idSubasta) => {
    try {
      setItem(null)
      let _item = await fetch(`${apiUrl}/api/subastas/catalogo/${idSubasta}/item-catalogo`);
      _item = await _item.json()
      setItem(_item)
      //Caso en el que existan pujas realizadas.
      if (_item.pujas[0] !== undefined) {
        setTimerClock(calculateClock(_item.pujas[0].horario))
      }

      setLoading(false)

    } catch (e) {
      setShowModal({...showModal, visible: true});
    }
  }

  useEffect(() => {
    getItemSubastandose(route.params.idSubasta);
    return () => {
      setIntervalStatus(false)
      setItem(null)
    };
  }, []);

  useEffect(() => {
    return () => {
    }
  })


  const changeItemEstado = async () => {
    return await fetch(`${apiUrl}/api/subastas/catalogo/change-item-estado`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({idItemCatalogo: item.idItemCatalogo, idProducto: item.idProducto})
    })
      .then((response) => response.text())
      .then((responseData) => {
        console.log(responseData)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (!loading && item && timerClock > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          <SubastaCarousel navigation={navigation} fotos={item.fotos} setIntervalStatus={setIntervalStatus}
                           idSubasta={route.params.idSubasta}/>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemTitle}>
            Descripción Item
          </Text>
          <View style={styles.itemCardDescription}>
            <View style={styles.itemTextContainer}>
              <Text style={{fontSize: 12}} numberOfLines={5}>
                {item.descripcionCompleta}
              </Text>
            </View>
            <View style={styles.verticleLine}/>
            <View style={styles.itemTextPriceContainer}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                Precio Base
              </Text>
              <Text>
                ${item.precioBase}
              </Text>
              <Text style={{fontSize: 12, paddingBottom: 2, fontWeight: 'bold'}}>
                Tiempo restante
              </Text>
              <CountDown
                until={timerClock}
                onFinish={() => changeItemEstado()}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FC9905'}}
                separatorStyle={{color: '#000'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                size={12}
              />
            </View>
          </View>

        </View>

        <View style={styles.pujasListContainer}>


          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {
              (item.pujas.length > 0) ? item.pujas.map((item, idx) => {
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
                          <Text style={{fontSize: 16, fontWeight: 'bold',}}>Realizó una oferta por</Text>
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
                <Text style={{
                  left: 0,
                  right: 0,
                  top: '50%',
                  height: 200,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>¡Sé la primera persona en ofertar!</Text>

            }

          </ScrollView>
          <View style={{marginVertical: 8}}>
            {
              userData ? <Button
                  onPress={() => {
                    if (metodosDePago.cuentasBancarias.length === 0 || metodosDePago.tarjetas.length === 0)
                      navigation.navigate('MetodosPagoScreen', {screen: 'MetodosPago'})
                    else
                      navigation.navigate('NuevaPuja', {
                        categoriaSubasta: route.params.categoriaSubasta,
                        clock: downCountClock
                      })
                  }}
                  title='Nueva Oferta'
                  type='solid'
                  titleStyle={{fontWeight: '100', color: '#fafafa', paddingLeft: 8}}
                  buttonStyle={{
                    backgroundColor: '#FC9905',
                    borderRadius: 5,
                    width: 350,
                    borderWidth: 1.7,
                    borderColor: '#FC9905',
                    marginHorizontal: 5
                  }}
                /> :
                <Button
                  onPress={() => {
                    navigation.navigate('Login')
                  }}
                  title='Iniciar sesión para ofertar'
                  type='solid'
                  titleStyle={{fontWeight: '100', color: '#fafafa', paddingLeft: 8}}
                  buttonStyle={{
                    backgroundColor: '#FC9905',
                    borderRadius: 5,
                    width: 350,
                    borderWidth: 1.7,
                    borderColor: '#FC9905',
                    marginHorizontal: 5
                  }}
                />
            }

          </View>
        </View>
      </View>
    )
  } else if (showModal.visible) {
    return (<ModalSubasta modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>)
  } else return null

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
    height: '55%',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 6
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
    height: '36%',
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

export default ItemSubasta