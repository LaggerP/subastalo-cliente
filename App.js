import React, { useContext } from 'react';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import DashboardScreen from "./src/Screens/Dashboard/DashboardScreen";
import SubastaScreen from "./src/Screens/Subasta/SubastaScreen";
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
          <AuthStack.Screen name='DashboardScreen' component={DashboardScreen} options={{ title: '', headerShown: false }} />
          <AuthStack.Screen name='SubastaScreen' component={SubastaScreen} options={{ title: 'SubastaScreen', headerShown: false }} />
          <AuthStack.Screen name='Login' component={Login} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RestablecerPrimer' component={RestablecerPrimer} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RestablecerSegundo' component={RestablecerSegundo} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroUno' component={RegistroUno} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroDos' component={RegistroDos} options={{title: '', headerLeft: null, headerTransparent: true}}/>
          <AuthStack.Screen name='RegistroExito' component={RegistroExito} options={{title: '', headerLeft: null, headerTransparent: true}}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
