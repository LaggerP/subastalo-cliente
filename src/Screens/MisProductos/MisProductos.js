import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import {DataContext} from "../../context/DataContext";
import {Icon} from "react-native-elements";
import Camara from "../../Components/Camara/Camara";

const MisProductos = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
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
     <Camara/>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MisProductos