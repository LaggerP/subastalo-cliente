import React, {useContext} from 'react';

// Navigator
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

// Screens
import Dashboard from "./src/Screens/Dashboard/Dashboard";
import Perfil from "./src/Screens/Perfil/Perfil";
import Login from "./src/Screens/Login/Login";
import RestablecerPrimer from "./src/Screens/Login/RestablecerPrimer";
import RestablecerSegundo from "./src/Screens/Login/RestablecerSegundo";
import RegistroUno from "./src/Screens/Registro/RegistroUno";
import RegistroDos from "./src/Screens/Registro/RegistroDos";
import RegistroExito from "./src/Screens/Registro/RegistroExito";

// Providers
import { DataProvider } from "./src/context/DataContext";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name='Dashboard' component={Dashboard} options={{title: '', headerTransparent: true}}/>
          <AuthStack.Screen name='Perfil' component={Perfil} options={{title: 'Perfil', headerTransparent: true}}/>
          <AuthStack.Screen name='Login' component={Login} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RestablecerPrimer' component={RestablecerPrimer} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RestablecerSegundo' component={RestablecerSegundo} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroUno' component={RegistroUno} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroDos' component={RegistroDos} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroExito' component={RegistroExito} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          {/* <AuthStack.Screen name='Historial' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MisProductos' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MetodosDePago' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Subasta' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Catalogo' component={} options={{ title: '', headerTransparent: true }}/> */}
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
