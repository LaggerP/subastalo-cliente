import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {DataContext} from "../../context/DataContext";

const Dashboard = ({navigation}) => {

  //Data from context provider
  const {userData, subastas, setSubastas} = useContext(DataContext);
  console.log(subastas)

  const getSubastas = async () => {
    return await fetch('http://localhost:3000/api/subastas')
      .then((response) => response.json())
      .then((json) => {
        setSubastas(json.subastas);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getSubastas()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.userContainer}>
        <Text>
          asdfasdf
        </Text>
      </View>

      <Button title='Mi Perfil' onPress={() => navigation.push('Perfil')}/>
      <Button title='Login' onPress={() => navigation.push('Login')}/>

      <ScrollView vertical showsHorizontalScrollIndicator={false}>

      </ScrollView>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FC9905',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userContainer: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginTop: '10%',
    height: '30%',
    width: '90%',
  },

  auctionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    height: '30%',
    width: '90%',
  },
});


export default Dashboard