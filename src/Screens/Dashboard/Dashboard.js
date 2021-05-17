import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export const Dashboard = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <View style={styles.userContainer}>

            </View>
            
            <Button title='Mi Perfil' onPress={() => navigation.push('Perfil')} />
            
            <ScrollView vertical showsHorizontalScrollIndicator={false} >

            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FC9905',
        alignItems: 'center',
        justifyContent: 'center',
    },

    userContainer: {
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        marginTop: '10%',
        height: '30%',
        width: '90%',
    },

    auctionCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        height: '30%',
        width: '90%',
    },
});