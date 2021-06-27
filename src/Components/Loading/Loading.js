import { apiUrl } from "../../api";
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { Icon, } from "react-native-elements";

const Loading = ({ color }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <ActivityIndicator size={70} color={color} />
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

export default Loading