import React, { useContext } from 'react';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Dashboard from "./src/Screens/Dashboard/Dashboard";
import Perfil from "./src/Screens/Perfil/Perfil";
// import MetodosPago from "./src/Screens/MetodosPago/MetodosPago";
// import NuevaTarjeta from "./src/Screens/MetodosPago/NuevaTarjeta";
// import NuevaCuentaBancaria from "./src/Screens/MetodosPago/NuevaCuentaBancaria";
import MetodosPagoScreen from "./src/Screens/MetodosPago/MetodosPagoScreen";
import SubastaScreen from "./src/Screens/Subasta/SubastaScreen";

// Providers
import { DataProvider } from "./src/context/DataContext";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name='Dashboard' component={Dashboard} options={{title: '', headerTransparent: true, cardStyle: { backgroundColor: '#FC9905' } }}/>
          <AuthStack.Screen name='Perfil' component={Perfil} options={{title: 'Perfil', headerTransparent: true}}/>
          <AuthStack.Screen name='SubastaScreen' component={SubastaScreen} options={{ title: 'Subasta', headerShown: false }}/>
          <AuthStack.Screen name='MetodosPagoScreen' component={MetodosPagoScreen} options={{ title: 'Metodos de Pago', headerShown: false }}/>
          {/* <AuthStack.Screen name='Historial' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MisProductos' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MetodosDePago' component={} options={{ title: '', headerTransparent: true }}/>

        <AuthStack.Screen name='Catalogo' component={} options={{ title: '', headerTransparent: true }}/> */}
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
