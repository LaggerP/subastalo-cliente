import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { Image, } from 'react-native-elements'


const ProductCard = ({ navigation, idProducto, precioBase, fecha, descripcionCatalogo, descripcionCompleta, revisor, nombreRevisor, duenio, estado, fotos }) => {

    const [spinner, setSpinner] = useState(false);

    let producto = {
        idProducto: idProducto,
        precioBase: precioBase,
        fecha: fecha,
        descripcionCatalogo: descripcionCatalogo,
        descripcionCompleta: descripcionCompleta,
        revisor: revisor,
        nombreRevisor: nombreRevisor,
        duenio: duenio,
        estado: estado,
        fotos: fotos
    }

    const Strong = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    return (
        <View style={styles.productCard}>

            <View style={{ flexDirection: 'row', flex: 1, }}>
                <View style={{ flexDirection: 'column', flex: 0.35, paddingRight: 13, justifyContent: 'center', }}>
                    {spinner ?
                        <ActivityIndicator size={40} color="#FFAE00" style={{ alignSelf: 'center', }} />
                        :
                        <Image
                            style={{ height: '100%', width: '100%', borderRadius: 10, }}
                            source={{ uri: fotos[0].foto }}
                        />
                    }
                </View>
                <View style={{ flexDirection: 'column', flex: 0.65, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', }}>
                        <Text numberOfLines={1} style={{ fontSize: 15, alignSelf: 'flex-start', fontWeight: 'bold', paddingRight: 10 }}>{descripcionCatalogo}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', }}>
                        <Text style={{ fontSize: 13, alignSelf: 'flex-start', marginTop: 5 }}><Strong>Estado:</Strong> {estado} </Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', }}>
                        <Text style={styles.link} onPress={() => navigation.navigate('DetallesProducto', { producto: producto })} >Ver detalles</Text>
                    </View>
                </View>
            </View>

        </View>

    )
};

const styles = StyleSheet.create({

    productCard: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 7,

        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        height: 130,
        padding: 13,
        marginBottom: 15
    },

    link: {
        color: '#E3AD37',
        fontSize: 14,
        alignSelf: 'flex-end',
        marginRight: 10
    },

});


export default ProductCard