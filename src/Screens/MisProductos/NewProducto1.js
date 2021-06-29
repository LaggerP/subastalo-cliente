import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';

//Provider
import { DataContext } from "../../context/DataContext";
import { ProductosContext } from "../../context/ProductosContext";

// Components
import { ModalProducto } from '../../Components/Producto/ModalProducto';

const NewProducto1 = ({ navigation }) => {
  const [nombre, onChangeNombre] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState();
  const [descripcion, onChangeDescripcion] = useState(null);

  const [showModal, setShowModal] = useState({
    visible: false,
    title: '',
    msg: '',
    icon: ''
  });


  //Data from context provider
  const { userData } = useContext(DataContext);
  const { newProduct, setNewProduct } = useContext(ProductosContext);
  console.log('PRODUCTO', newProduct)
  console.log('NOMBRE', nombre)
  console.log('CATEGORIA', selectedCategoria)
  console.log('DESCRIPCION', descripcion)

  const createProducto1 = () => {
    if (nombre != null && selectedCategoria != null && descripcion != null) {
      let categoriaNueva = parseInt(selectedCategoria);
      setNewProduct({
        disponible: 'si',
        descripcionCatalogo: nombre,
        descripcionCompleta: descripcion,
        revisor: 1,
        estado: 'pendiente',
        categoria: categoriaNueva
      })
      navigation.navigate('NewProducto2')
    } else {
      setShowModal({
        visible: true,
        title: 'Datos inválidos',
        msg: 'Para continuar debe completar todos los campos',
        icon: 'warning'
      })
    }
  }

  useEffect(() => {
    return () => { }
  }, [])

  return (
    <>
      <ModalProducto modalData={showModal} setShowModal={setShowModal} navigation={navigation} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleCard}>
            <Text style={styles.titleText}>Publicar un producto</Text>
          </View>
          <View style={styles.inputCard}>
            <Text style={styles.titleText}>Ingresar una breve descripción</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNombre}
              value={nombre}
              placeholder='Ejemplo: Jeep Compass'
            />
          </View>
          <View style={styles.selectionCard}>
            <Text style={styles.titleText}>Seleccionar una categoría</Text>
            <Picker
              selectedValue={selectedCategoria}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategoria(itemValue)}>

              <Picker.Item label='Antigüedades' value='1' />
              <Picker.Item label='Indumentaria' value='2' />
              <Picker.Item label='Vehículos y Accesorios' value='3' />
              <Picker.Item label='Joyería' value='4' />
              <Picker.Item label='Deportes' value='5' />
              <Picker.Item label='Bazar' value='6' />
              <Picker.Item label='Otros' value='7' />
            </Picker>
          </View>
          <View style={styles.descripcionCard}>
            <Text style={styles.titleText}>Ingresar una descripción completa</Text>
            <TextInput style={styles.inputDescripcion}
              multiline={true}
              numberOfLines={5}
              onChangeText={onChangeDescripcion}
              value={descripcion}
              placeholder='Ejemplo: Modelo del año 2018 en perfecto estado. Tiene 10.000 kilómetros y es de color blanco'

            />
          </View>
        </View>
        <View style={styles.footerApp}>
          <Button
            title='Continuar'
            type='solid'
            titleStyle={{ color: '#000000' }}
            buttonStyle={{
              backgroundColor: '#FFAE00',
              borderRadius: 10,
              height: 42,
              width: 125,
              borderColor: '#FFAE00'
            }}
            containerStyle={{ width: 145, alignSelf: 'flex-end', }}
            // onPress={() => navigation.navigate('MisProductosScreen', {screen: 'NewProducto2'})}
            onPress={createProducto1}
          />
        </View>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905'
  },
  titleCard: {
    height: 77,
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputCard: {
    height: 121,
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    width: 300,
    fontSize: 20,
    padding: 10,
  },
  selectionCard: {
    height: 121,
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  descripcionCard: {
    height: 250,
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  inputDescripcion: {
    height: 200,
    margin: 10,
    borderWidth: 1,
    width: 300,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
  },
  footerApp: {
    backgroundColor: '#14181B',
    width: '100%',
    height: 67,
    justifyContent: 'center',
  },

})

export default NewProducto1;