import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

const ErrorModal = (props) => {

    return (
        <View>
            <Overlay isVisible={props.isVisible} onBackdropPress={props.toggleOverlay} overlayStyle={styles.container} >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                    <Text style={styles.title}>¡Ups!</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center', }}>
                    <Text style={styles.description}>No se ha encontrado ninguna subasta. Vuelva a intentarlo más tarde.</Text>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'column', justifyContent: 'center', }}>
                    <Button
                        title='Aceptar'
                        type='outline'
                        buttonStyle={{ borderRadius: 5, borderWidth: 1.7, borderColor: '#FC9905', height: 50 }}
                        titleStyle={{ color: '#FC9905' }}
                        containerStyle={{ width: 110, alignSelf: 'center' }}
                        onPress={props.toggleOverlay}
                    />
                </View>
            </Overlay>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 300,
        borderRadius: 10,
    },

    title: {
        fontSize: 38,
        textAlign: 'center'
    },

    description: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 23
    },

});

export default ErrorModal;