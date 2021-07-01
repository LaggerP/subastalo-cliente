import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Providers
import {MetodoPagoProvider} from '../../context/MetodoPagoContext';
import {PujasProvider} from "../../context/PujasContext";

// Components
import NuevaPuja from './NuevaPuja';
import ItemSubasta from './ItemSubasta';
import MetodoDePagoSubasta from './MetodoDePagoSubasta';

const SubastaStack = createStackNavigator();

const SubastaScreen = () => {
  return (
    <MetodoPagoProvider>
      <PujasProvider>
        <SubastaStack.Navigator>
          <SubastaStack.Screen name='ItemSubasta' component={ItemSubasta} options={{title: 'ItemSubasta', headerShown: false}}/>
          <SubastaStack.Screen name='NuevaPuja' component={NuevaPuja} options={{title: 'NuevaPuja', headerShown: false}}/>
          <SubastaStack.Screen name='MetodoDePagoSubasta' component={MetodoDePagoSubasta} options={{title: 'MetodoDePagoSubasta', headerShown: false}}/>
        </SubastaStack.Navigator>
      </PujasProvider>
    </MetodoPagoProvider>
)
};

export default SubastaScreen