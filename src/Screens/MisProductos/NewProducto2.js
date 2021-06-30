import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';

// Provider
import { DataContext } from "../../context/DataContext";
import { ProductosContext } from "../../context/ProductosContext";
import { apiUrl } from "../../api";

// Icons
import galleryIcon from '../../../assets/imageIcons/addImage.png';

// Components
import { ModalProducto } from '../../Components/Producto/ModalProducto';

// Image Picker
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "../../api";

const NewProducto2 = ({ navigation }) => {
  const [spinner, setSpinner] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [showModal, setShowModal] = useState({
    visible: false,
    title: '',
    msg: '',
    icon: ''
  });

  //Data from context provider
  const { userData } = useContext(DataContext);
  const { newProduct, setNewProduct } = useContext(ProductosContext);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        let file = {
            uri: result.uri,
            type: `test/${result.uri.split(".")[1]}`,
            name: `test/${result.uri.split(".")[1]}`,
        }
        setNewProduct({...newProduct, fotos: file});
        setImagenes(imagenes.concat(file));
        setSpinner(false);
    }
  }

  const createProducto2 = async () => {
    if (imagenes.length > 0) {
      let imageUrl = await uploadImage(newProduct.fotos);
      let dataProducto = {
        disponible: newProduct.disponible,
        descripcionCatalogo: newProduct.descripcionCatalogo,
        descripcionCompleta: newProduct.descripcionCompleta,
        revisor: newProduct.revisor,
        duenio: userData.idCliente,
        estado: newProduct.estado,
        categoria: newProduct.categoria,
        fotos: imageUrl,
      }
      const nuevoProducto = await createProd(dataProducto);
      if (nuevoProducto.status === 201) {
        setShowModal({
          visible: true,
          title: '¡Producto creado con éxito!',
          msg: 'Recuerde que antes de poner su producto en subasta, tenemos que verificarlo. Se le notificará por email cuando este proceso esté completo',
          icon: 'newProducto'
        })
      }
    } else {
      setShowModal({
        visible: true,
        title: '¡Datos inválidos!',
        msg: 'Para continuar debe colocar por lo menos una imágen del producto',
        icon: 'warning'
      })
    }
  };

  const createProd = async (dataProducto) => {
    try {
      let newProducto = await fetch(`${apiUrl}/api/productos/new`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProducto)
      });
      newProducto = await newProducto.json()
      return newProducto;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => { }
  }, [])

    return(
      <>
        <ModalProducto modalData={showModal} setShowModal={setShowModal} navigation={navigation} />
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.titleCard}>
                <Text style={styles.titleText}>Subir fotos (6 máximo)</Text>
              </View>
              <Pressable style={styles.btnAdd} onPress={() => showImagePicker()}>
                  <Image
                    style={styles.icons}
                    source={galleryIcon}
                  />
              </Pressable>
              <View style={styles.imageContainer} >
                <Image style={styles.image} source={newProduct.fotos}/>
              </View>
            </View>
            <View style={styles.footerApp}>
              <Button
                title='Publicar'
                type='solid'
                titleStyle={{color: '#000000'}}
                buttonStyle={{
                  backgroundColor: '#FFAE00',
                  borderRadius: 10,
                  height: 42,
                  width: 125,
                  borderColor: '#FFAE00'
                }}
                containerStyle={{width: 145, alignSelf: 'flex-end',}}
                onPress={createProducto2}
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
    btnAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal:15,
        width: 100,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
      },
      btnAddText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#FAFAFA',
        marginVertical: 5,
      },
      icons: {
        width: 50, 
        height: 50,
        marginLeft: 7
      },
      imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 150,
        height: 150,
        marginVertical: 20, 
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 10, 
      },
    footerApp: {
      backgroundColor: '#14181B',
      width: '100%',
      height: 67,
      justifyContent: 'center',
    },

})

export default NewProducto2;