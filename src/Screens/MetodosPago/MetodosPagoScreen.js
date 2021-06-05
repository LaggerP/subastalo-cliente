import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Providers
import {MetodoPagoProvider} from '../../context/MetodoPagoContext';

// Components
import MetodosPago from './MetodosPago';
import NuevaTarjeta from './NuevaTarjeta';
import NuevaCuentaBancaria from './NuevaCuentaBancaria';

const MetodosPagoStack = createStackNavigator();

const MetodosPagoScreen = () => {
  return (
    <MetodoPagoProvider>
        <MetodosPagoStack.Navigator>
            <MetodosPagoStack.Screen name='MetodosPago' component={MetodosPago} options={{title: 'MetodosPago', headerShown: false}}/>
            <MetodosPagoStack.Screen name='NuevaTarjeta' component={NuevaTarjeta} options={{title: 'NuevaTarjeta', headerShown: false}}/>
            <MetodosPagoStack.Screen name='NuevaCuentaBancaria' component={NuevaCuentaBancaria} options={{title: 'NuevaCuentaBancaria', headerShown: false}}/>
        </MetodosPagoStack.Navigator>
    </MetodoPagoProvider>
)
};

export default MetodosPagoScreen