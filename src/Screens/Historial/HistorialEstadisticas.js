import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { apiUrl } from "../../api";


import { DataContext } from "../../context/DataContext";

import { PieChart } from 'react-native-svg-charts'


const HistorialEstadisticas = ({navigation}) => {

  const [pujas, setPujas] = useState([]);

  const {userData} = useContext(DataContext);
  
  let itemsGanados = pujas.filter(pujas =>pujas.ganador === 'si').length;

  let itemsTotales = [...new Set(pujas.map(a => a.item))].length;

  let itemsParticipados = itemsTotales - itemsGanados;

  const dataPie=[
    {
      key: 1,
      value: itemsGanados,
      svg: { fill: '#86DDD4' },
    },
    {
        key: 2,
        value: itemsParticipados,
        svg: { fill: '#20336E' },
    }
]

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
    getPujas();
  }, [])

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
              <Text style={styles.buttonText}>{itemsParticipados}</Text>
              <Text textBreakStrategy='simple' style={{ fontSize: 12, textAlign: 'center', marginTop: 4  }}>Participaciones</Text>
            </View>

            <View style={styles.btn}>
   
            </View>

            <View style={styles.btn}>
              <Text style={styles.buttonText}>{itemsGanados}</Text>
              <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 4  }}>Articulos</Text>
              <Text style={{ fontSize: 12, textAlign: 'center' }}>Ganados</Text>
            </View>
          </View>

        </View>

        <View style={styles. pujasListContainer}>
        <PieChart
                style={{ width:300, height:300, marginTop: 30 }}
                data={dataPie}
                spacing={0}
                outerRadius={'100%'}
                innerRadius={'60%'}
            />
        
        <Text style={styles.pieTxtImportante}>{itemsTotales}</Text>
        <Text style={styles.pieTxt}>Cantidad total</Text>

        <View style={styles.boxBlue}><Text style={{width:300, height:100, marginLeft:30, fontSize: 20}}>Articulos Ganados ({(itemsGanados/itemsTotales*100).toFixed(1)}%)</Text></View>
        <View style={styles.boxCeleste}><Text style={{width:300, height:100, marginLeft:30, fontSize: 20}}>Participaciones ({(itemsParticipados/itemsTotales*100).toFixed(1)}%)</Text></View>
        </View>

     
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
  },


  auctionsContainer: {
    flex: 1,
    width: '95%',
    marginTop: 10,
    height: '100%'
  },

  pujasListContainer: {
    backgroundColor: '#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    
    shadowOpacity: 0.30,
    elevation: 8,
    shadowRadius: 4.65,
    borderRadius: 8,
    marginTop: 20,

    height: 500,
    paddingLeft: 45,
    paddingRight: 45,
    
  },
  pieTxt: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 200,
  },
  pieTxtImportante: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 145,
  },
  boxBlue:{
      marginTop: 20,
      height:25,
      width:25,
      backgroundColor: '#86DDD4'
  },
  boxCeleste:{
      marginTop: 20,
      height:25,
      width:25,
      backgroundColor:'#20336E'
  }
});

export default HistorialEstadisticas;