import React, { useContext, useEffect, useState, useRef } from 'react';
import { Roboto_500Medium, } from '@expo-google-fonts/roboto';
import {
    useFonts,
    CinzelDecorative_400Regular,
    CinzelDecorative_700Bold,
    CinzelDecorative_900Black,
} from '@expo-google-fonts/cinzel-decorative';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Badge } from 'react-native-elements';
import Moment from 'moment';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

//Providers
import { DataContext } from "../../context/DataContext";
import { ProductosContext } from "../../context/ProductosContext";

// Components
import ProductCard from '../../Components/Producto/ProductCard';
import Loading from "../../Components/Loading/Loading";

const { width: screenWidth } = Dimensions.get('window');

const DetallesProducto = ({ route, navigation }) => {

    //Data from context provider
    const { userData } = useContext(DataContext);
    const { productos, setProductos } = useContext(ProductosContext);

    //Carousel
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

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

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.foto }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        )
    }

    useEffect(() => {
        setEntries(route.params.producto.fotos)
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
                                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', fontSize: 17, paddingRight: 20 }}>${route.params.producto.estado !== 'aceptado' ? '????' : route.params.producto.precioBase}</Text>
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

                        <View style={styles.cardCarousel}>
                            <Carousel
                                layout={"default"}
                                ref={carouselRef}
                                data={entries}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                itemWidth={screenWidth - 60}
                                renderItem={renderItem}
                                hasParallaxImages={true} />
                        </View>
                        <View style={styles.card}>

                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Detalles</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                                <View style={{ flex: 0.49, flexDirection: 'column', }}>
                                    <Text>Fecha de registro:</Text>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'row', }}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                                        <Text style={{ alignSelf: 'flex-start', textTransform: 'capitalize' }}>{Moment(route.params.producto.fecha).format('DD/MM/YYYY')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                                <View style={{ flex: 0.49, flexDirection: 'column', }}>
                                    <Text>Categoría:</Text>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'row', }}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                                        <Text style={{ alignSelf: 'flex-start', textTransform: 'capitalize' }}>{route.params.producto.categoria}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.49, flexDirection: 'column', }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Estado</Text>
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
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 0.5, flexDirection: 'column', }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Revisor</Text>
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
        paddingBottom: 25,
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
    cardCarousel: {
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
        width: '95%',
        padding: 10,
        alignItems: 'center',
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },


});


export default DetallesProducto