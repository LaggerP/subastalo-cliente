import React from 'react';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import DashboardScreen from "./src/Screens/Dashboard/DashboardScreen";
import SubastaScreen from "./src/Screens/Subasta/SubastaScreen";
import LoginScreen from "./src/Screens/Login/LoginScreen";
import MetodosPagoScreen from "./src/Screens/MetodosPago/MetodosPagoScreen";
import Catalogo from "./src/Screens/Catalogo/Catalogo";
import PerfilScreen from "./src/Screens/Perfil/PerfilScreen";
import MisProductosScreen from "./src/Screens/MisProductos/MisProductosScreen";
import HistorialScreen from './src/Screens/Historial/HistorialScreen';

// Providers
import { DataProvider } from "./src/context/DataContext";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer >
        <AuthStack.Navigator>
          <AuthStack.Screen name='DashboardScreen' component={DashboardScreen} options={{ title: '', headerShown: false }} />
          <AuthStack.Screen name='SubastaScreen' component={SubastaScreen} options={{ title: 'SubastaScreen', headerShown: false }} />
          <AuthStack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'LoginScreen', headerShown: false }} />
          <AuthStack.Screen name='MetodosPagoScreen' component={MetodosPagoScreen} options={{ title: 'MetodosPagoScreen', headerShown: false }} />
          <AuthStack.Screen name='PerfilScreen' component={PerfilScreen} options={{ title: 'PerfilScreen', headerShown: false }} />
          <AuthStack.Screen name='Catalogo' component={Catalogo} options={{ title: 'Catalogo', headerShown: false }} />
          <AuthStack.Screen name='MisProductosScreen' component={MisProductosScreen} options={{ title: 'MisProductosScreen', headerShown: false }} />
          <AuthStack.Screen name='HistorialScreen' component={HistorialScreen} options={{title: 'HistorialScreen', headerShown: false}} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
