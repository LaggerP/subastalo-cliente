import { apiUrl } from "../../api";
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, } from 'react-native';
import { useFonts, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { Icon, Avatar, Button, Input, } from "react-native-elements";
import { ProfileModal } from "../../Components/Perfil/ProfileModal";

//Context
import { DataContext } from "../../context/DataContext";

//Components
import Loading from "../../Components/Loading/Loading";

const Perfil = ({ navigation }) => {
  const { setUserData, userData, setSesionIniciada } = useContext(DataContext);
  const [newUserData, setNewUserData] = useState({
    identificador: userData.idPersona,
    nombreCompleto: userData.nombreCompleto,
    direccion: userData.direccion,
  });
  const [showModal, setShowModal] = useState({
    visible: false,
    title: '',
    msg: '',
  });

  const updateUserData = async () => {
    try {
      let updateData = await fetch(`${apiUrl}/api/user/update-data`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
      });
      if (updateData.status === 201) {
        setUserData({ ...userData, nombreCompleto: newUserData.nombreCompleto, direccion: newUserData.direccion })
        setShowModal({
          visible: true,
          title: '¡Éxito!',
          msg: 'Los datos fueron actualizados correctamente.'
        })
      }
      if (updateData.status === 500) {
        setShowModal({
          visible: true,
          title: '¡Ups!',
          msg: 'Ha ocurrido un error. Vuelva a intentarlo más tarde.'
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  const logOut = async () => {
    let keys = ['email', 'password', 'sesionIniciada'];
    await AsyncStorage.multiRemove(keys, (err) => {
      setSesionIniciada(false)
      navigation.pop()
      // setUserData(null)
      console.log('Storage eliminada');
    });
  }

  const inputValid = (input) => {
    let valid = false;
    if (input == 'nombreCompleto') {
      if (newUserData.nombreCompleto !== '') {
        valid = true;
      }
    }
    if (input == 'direccion') {
      if (newUserData.direccion !== '') {
        valid = true;
      }
    }
    if (input == 'AllInputs') {
      if ((newUserData.nombreCompleto !== '' && newUserData.direccion !== '') && (newUserData.nombreCompleto !== userData.nombreCompleto || newUserData.direccion !== userData.direccion)) {
        valid = true;
      }
    }
    return valid;
  }

  //Fonts
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  //Linea
  const Linea = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ flex: 1, height: 1.5, backgroundColor: '#D6D6D6', marginBottom: 10 }} />
      </View>
    )
  };

  if (!fontsLoaded) {
    return <Loading color="#FC9905" />;
  } else return (
    <View style={{ flex: 1 }}>
      <ProfileModal modalData={showModal} setShowModal={setShowModal} navigation={navigation} />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.userCard}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                size='xlarge'
                rounded
                source={{
                  uri:
                    userData.foto,
                }}>
                <Avatar.Accessory
                  raised
                  reverse
                  size={30}
                  name='camera'
                  type='ionicon'
                  color='#E3AD37'
                  style={{ margin: 5 }}
                  onPress={() => navigation.navigate('FotoPerfil')}
                />
              </Avatar>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
              <Icon
                name='star'
                type='feather'
                color='#E3AD37'
                iconStyle={{
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: '#E3AD37',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  padding: 1.5,
                }}
                containerStyle={{ alignSelf: 'center', }}
                size={18} />
              <Text style={styles.title}>Categoría</Text>
            </View>
            <Linea />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: 40 }}>
              <Input
                disabled={true}
                value={(userData.categoria) == 'comun' ? 'común' : userData.categoria}
                inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#E3AD37', paddingLeft: 11, textTransform: 'capitalize', }}
                inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 12, color: '#9B9B9B', paddingLeft: 15, }}>Tu categoría determina el nivel de subastas en las que puedes </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ fontSize: 12, color: '#9B9B9B', paddingLeft: 15, }}>participar.<Text style={styles.link} onPress={() => navigation.navigate('CategoriaPerfil')} > Más información</Text></Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
              <Icon
                name='user'
                type='antdesign'
                color='#E3AD37'
                iconStyle={{
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: '#E3AD37',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  padding: 1.5,
                }}
                containerStyle={{ alignSelf: 'center', }}
                size={18} />
              <Text style={styles.title}>Datos personales</Text>
            </View>
            <Linea />
            <Input
              placeholder='Nombre completo'
              defaultValue={userData.nombreCompleto}
              inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#CACACA', paddingLeft: 11, }}
              inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              containerStyle={inputValid('nombreCompleto') ? { height: 40, marginBottom: 8 } : { height: 40, marginBottom: 20 }}
              errorStyle={{ margin: 0, marginLeft: 5 }}
              errorMessage={inputValid('nombreCompleto') ? null : 'Campo obligatorio'}
              onChangeText={(text) => setNewUserData({ ...newUserData, nombreCompleto: text })}
            />
            <Input
              disabled={true}
              placeholder='Documento de identidad'
              defaultValue={userData.documento}
              inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#CACACA', paddingLeft: 11, }}
              inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              containerStyle={{ height: 40, marginBottom: 8, }}
            />
            <Input
              disabled={true}
              placeholder='Nacionalidad'
              defaultValue={userData.nacionalidad}
              inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#CACACA', paddingLeft: 11, }}
              inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              containerStyle={{ height: 40, marginBottom: 8, }}
            />
            <Text style={styles.link} onPress={() => navigation.navigate('RestablecerPrimer')}>Cambiar contraseña</Text>
          </View>

          <View style={styles.card}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 10, }}>
              <Icon
                name='mail'
                type='feather'
                color='#E3AD37'
                iconStyle={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  paddingLeft: 3
                }}
                containerStyle={{ alignSelf: 'center', }}
                size={22} />
              <Text style={styles.title}>Datos de contacto</Text>
            </View>
            <Linea />
            <Input
              placeholder='Dirección'
              defaultValue={userData.direccion}
              inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#CACACA', paddingLeft: 11, }}
              inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              containerStyle={{ height: 40, marginBottom: 8, }}
              containerStyle={inputValid('direccion') ? { height: 40, marginBottom: 8 } : { height: 40, marginBottom: 20 }}
              errorStyle={{ margin: 0, marginLeft: 5 }}
              errorMessage={inputValid('direccion') ? null : 'Campo obligatorio'}
              onChangeText={(text) => setNewUserData({ ...newUserData, direccion: text })}
            />
            <Input
              disabled={true}
              placeholder='Correo electrónico'
              defaultValue={userData.email}
              inputStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: '#CACACA', paddingLeft: 11, }}
              inputContainerStyle={{ borderBottomWidth: 0, width: '100%', }}
              containerStyle={{ height: 40, marginBottom: 10, }}
            />
          </View>

          <Button
            disabled={inputValid('AllInputs') ? false : true}
            disabledStyle={{ borderColor: '#C4C4C4' }}
            title='Guardar'
            type='solid'
            titleStyle={{ fontWeight: '100' }}
            buttonStyle={{
              backgroundColor: '#FFAE00',
              borderRadius: 5,
              height: 35,
              borderWidth: 1.7,
              borderColor: '#FFAE00',
            }}
            containerStyle={{ width: '95%', alignSelf: 'center', margin: 5, marginTop: 30, }}
            onPress={() => updateUserData()}
          />

          <Button
            title='Cerrar sesión'
            type='solid'
            titleStyle={{ fontWeight: '100' }}
            buttonStyle={{
              backgroundColor: '#EE2C2C',
              borderRadius: 5,
              height: 35,
              borderWidth: 1.7,
              borderColor: '#EE2C2C',
            }}
            containerStyle={{ width: '95%', alignSelf: 'center', margin: 5, marginBottom: 35 }}
            onPress={() => logOut()}
          />
        </View>
      </ScrollView>
    </View>
  )
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
    height: 210,
    width: '95%',
  },

  card: {
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
    marginTop: 20,
    width: '95%',
  },

  link: {
    color: '#E3AD37',
    fontSize: 12,
    padding: 10,
    paddingTop: 0,
    marginLeft: 3
  },

  title: {
    fontSize: 18,
    alignSelf: 'center',
    paddingBottom: 5,
    paddingLeft: 10,
  },

});

export default Perfil