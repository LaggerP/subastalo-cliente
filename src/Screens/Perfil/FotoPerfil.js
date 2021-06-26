import { apiUrl } from "../../api";
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { Icon, } from "react-native-elements";

//Context
import { DataContext } from "../../context/DataContext";

//Image Picker
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "../../api";

const FotoPerfil = ({ navigation }) => {
    const { setUserData, userData } = useContext(DataContext);
    const [spinner, setSpinner] = useState(false);

    const updateProfileImage = async (file) => {
        try {
            setSpinner(true);
            let imageUrl = await uploadImage(file);
            let updatePhoto = await fetch(`${apiUrl}/api/user/update-image`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl: imageUrl,
                    idCliente: userData.idCliente
                })
            });
            if (updatePhoto.status === 201) {
                setUserData({ ...userData, foto: imageUrl })
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Fonts
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
    });

    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            let file = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test/${result.uri.split(".")[1]}`,
            }
            await updateProfileImage(file);
            setSpinner(false);
        }
    }

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            let file = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test/${result.uri.split(".")[1]}`,
            }
            await updateProfileImage(file);
            setSpinner(false);
        }
    }

    useEffect(() => {
        return () => { }
    }, [])

    if (!fontsLoaded) {
        return <Text>Loading</Text>;
    } else return (
        <View style={{ flex: 1 }}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.userCard}>
                        <View style={styles.userSection}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {spinner ?
                                    <ActivityIndicator size={70} color="#FFAE00" />
                                    :
                                    <Image
                                        style={{ height: '100%', width: '100%', borderRadius: 10, }}
                                        source={{ uri: userData.foto }}
                                    />
                                }
                            </View >
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footerApp}>
                <View style={styles.buttonsSection}>
                    <View style={styles.btn}>
                        <Icon
                            raised
                            reverse
                            name='image'
                            type='feather'
                            reverseColor='#000000'
                            color='#FFCD61'
                            size={22}
                            onPress={() => showImagePicker()}
                        />
                        <Text textBreakStrategy='simple' style={{ fontSize: 12, textAlign: 'center' }}>Galería</Text>
                    </View>

                    <View style={styles.btn}>
                        <Icon
                            raised
                            reverse
                            name='camera'
                            type='feather'
                            reverseColor='#000000'
                            color='#FFCD61'
                            size={22}
                            onPress={() => openCamera()}
                        />
                        <Text style={{ fontSize: 12, textAlign: 'center' }}>Cámara</Text>

                    </View>
                </View>
            </View>
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

    footerApp: {
        backgroundColor: '#FAFAFA',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        borderTopColor: '#CACACA',
        borderTopWidth: 1,
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
        alignSelf: 'center',
    },

});

export default FotoPerfil