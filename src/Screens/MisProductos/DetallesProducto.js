import React, { useContext, useEffect, useState } from 'react';
import { Roboto_500Medium, } from '@expo-google-fonts/roboto';
import {
    useFonts,
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { Badge } from 'react-native-elements';

//Providers
import { DataContext } from "../../context/DataContext";
import { ProductosContext } from "../../context/ProductosContext";

// Components
import ProductCard from '../../Components/Producto/ProductCard';
import Loading from "../../Components/Loading/Loading";

const DetallesProducto = ({ route, navigation }) => {

    //Data from context provider
    const { userData } = useContext(DataContext);
    const { productos, setProductos } = useContext(ProductosContext);

    //Fonts
    let [fontsLoaded] = useFonts({
        CinzelDecorative_400Regular,
        CinzelDecorative_700Bold,
        CinzelDecorative_900Black,
        Roboto_500Medium,
    });

    //Linea
    const Linea = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: 1, height: 1.5, backgroundColor: '#CACACA', }} />
            </View>
        )
    };

    const badgetColor = () => {
        let color;
        if (route.params.producto.estado === 'aceptado') {
            color = '#4BB543'
        } else if (route.params.producto.estado === 'rechazado') {
            color = '#FF3333'
        } else if (route.params.producto.estado === 'pendiente') {
            color = '#FFE70E'
        }
        return color;
    }

    useEffect(() => {
        return () => { }
    }, [])

    if (!fontsLoaded) {
        return <Loading color="white" />;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                        <View style={styles.card}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 1, justifyContent: 'flex-end', }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', fontSize: 17, paddingRight: 20 }}>${route.params.producto.precioBase}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{route.params.producto.descripcionCatalogo}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'column', paddingBottom: 10, }}>
                                <Text style={{ fontSize: 15 }}>{route.params.producto.descripcionCompleta}</Text>
                            </View>
                        </View>

                        <View style={styles.card}>

                        </View>
                        <View style={styles.card}>

                        </View>
                        <View style={styles.card}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.49, flexDirection: 'column', }}>
                                    <Text style={{ fontWeight: 'bold' }}>Estado:</Text>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'row', }}>
                                    <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-start', }}>
                                        <Badge badgeStyle={{ height: 25, width: 25, alignSelf: 'flex-start', borderRadius: 50, backgroundColor: badgetColor() }} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                                        <Text style={{ alignSelf: 'flex-start', textTransform: 'capitalize' }}>{route.params.producto.estado}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, flexDirection: 'column', }}>
                                    <Text style={{ fontWeight: 'bold' }}>Revisor:</Text>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center', }}>
                                    <Text style={{ alignSelf: 'flex-start', }}>{route.params.producto.nombreRevisor}</Text>
                                </View>
                            </View>
                        </View>


                    </View>
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        width: '95%',
    },


});


export default DetallesProducto