import React from 'react';

// Navigator
import {createStackNavigator} from "@react-navigation/stack";

// Components
import DashboardHistorial from "./DashboardHistorial";
import HistorialCatalogo from './HistorialCatalogo';
import HistorialOferta from './HistorialOferta';
import HistorialEstadisticas from './HistorialEstadisticas';

const DashboardStack = createStackNavigator();

const HistorialScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name='DashboardHistorial' component={DashboardHistorial} options={{
        title: '',
        headerTransparent: true,
        headerLeft: null,
        cardStyle: {backgroundColor: '#FC9905'}
      }}/>
      <DashboardStack.Screen name='HistorialCatalogo' component={HistorialCatalogo} options={{title: '', headerTransparent: true, headerLeft: null}}/>
      <DashboardStack.Screen name='HistorialOferta' component={HistorialOferta} options={{title: '', headerTransparent: true, headerLeft: null}}/>
      <DashboardStack.Screen name='HistorialEstadisticas' component={HistorialEstadisticas} options={{
        title: '',
        headerTransparent: true,
        headerLeft: null,
        cardStyle: {backgroundColor: '#FC9905'}
      }}/>
    </DashboardStack.Navigator>
  )
};

export default HistorialScreen