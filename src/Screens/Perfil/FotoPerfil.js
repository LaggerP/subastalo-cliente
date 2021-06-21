import React, { useContext } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { Icon, } from "react-native-elements";

//Context
import { DataContext } from "../../context/DataContext";

const FotoPerfil = ({ navigation }) => {
    const { setUserData, userData, setSesionIniciada } = useContext(DataContext);
    console.log(userData)

    //Fonts
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
    });

    //Linea
    const Linea = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: 1, height: 1.5, backgroundColor: '#CACACA' }} />
            </View>
        )
    };

    if (!fontsLoaded) {
        return <Text>Loading</Text>;
    } else return (
        <View style={{ flex: 1 }}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.userCard}>
                        <View style={styles.userSection}>
                            <TouchableOpacity  style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: '100%', width: '100%', borderRadius: 10,}}
                                    source={{
                                        uri: userData.foto,
                                    }}
                                />
                            </TouchableOpacity >
                        </View>
                    </View>
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
        marginBottom: '10%',
        paddingBottom: 10,
        height: 350,
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
        color: '#FFCD61',
        fontSize: 12,
        padding: 10,
        paddingTop: 0
    },

    title: {
        fontSize: 18,
        alignSelf: 'center',
        paddingBottom: 5,
        paddingLeft: 10,
    },

    userSection: {
        flex: 2,
        flexDirection: 'row',
        margin: 10,
    },

    buttonSection: {
        flex: 0.2,
        flexDirection: 'row',
        margin: 10,
        marginTop: 0,
        justifyContent: 'flex-end',
    },

});

export default FotoPerfil