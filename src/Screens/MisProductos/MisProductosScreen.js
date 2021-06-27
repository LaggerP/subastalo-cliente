import React from 'react';

// Navigator
import {createStackNavigator} from "@react-navigation/stack";

// Components
import MisProductos from "./MisProductos";

const PerfilStack = createStackNavigator();

const MisProductosScreen = () => {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen name='MisProductos' component={MisProductos} options={{title: 'Perfil', headerShown: false, cardStyle: { backgroundColor: '#FC9905' } }}/>
    </PerfilStack.Navigator>
  )
};

export default MisProductosScreen