import React from 'react';

// Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Providers
import { ProductosProvider } from '../../context/ProductosContext';

// Components
import MisProductos from "./MisProductos";
import NewProducto1 from './NewProducto1';
import NewProducto2 from './NewProducto2';
import DetallesProducto from "./DetallesProducto";

const PerfilStack = createStackNavigator();

const MisProductosScreen = () => {
  return (
    <ProductosProvider>
      <PerfilStack.Navigator>
        <PerfilStack.Screen name='MisProductos' component={MisProductos} options={{ title: 'Perfil', headerShown: false, cardStyle: { backgroundColor: '#FC9905' } }} />
        <PerfilStack.Screen name='DetallesProducto' component={DetallesProducto} options={{ title: 'Perfil', headerShown: false, cardStyle: { backgroundColor: '#FC9905' } }} />
        <PerfilStack.Screen name='NewProducto1' component={NewProducto1} options={{ title: 'NewProducto1', headerShown: false }} />
        <PerfilStack.Screen name='NewProducto2' component={NewProducto2} options={{ title: 'NewProducto2', headerShown: false }} />
      </PerfilStack.Navigator>
    </ProductosProvider>
  )
};

export default MisProductosScreen