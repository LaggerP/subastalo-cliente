import React from 'react';

// Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Providers
import { ProductosProvider } from '../../context/ProductosContext';

// Components
import MisProductos from "./MisProductos";

const PerfilStack = createStackNavigator();

const MisProductosScreen = () => {
  return (
    <ProductosProvider>
      <PerfilStack.Navigator>
        <PerfilStack.Screen name='MisProductos' component={MisProductos} options={{ title: 'Perfil', headerShown: false, cardStyle: { backgroundColor: '#FC9905' } }} />
      </PerfilStack.Navigator>
    </ProductosProvider>
  )
};

export default MisProductosScreen