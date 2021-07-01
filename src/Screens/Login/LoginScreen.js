import React from 'react';

// Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Login from "./Login";
import RestablecerPrimer from "./RestablecerPrimer";
import RestablecerSegundo from "./RestablecerSegundo";
import RegistroUno from "../Registro/RegistroUno";
import RegistroDos from "../Registro/RegistroDos";
import RegistroExito from "../Registro/RegistroExito";

const LoginStack = createStackNavigator();

const LoginScreen = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name='Login' component={Login} options={{ title: '', headerLeft: null, headerTransparent: true }} />
            <LoginStack.Screen name='RestablecerPrimer' component={RestablecerPrimer} options={{ title: '', headerLeft: null, headerTransparent: true }} />
            <LoginStack.Screen name='RestablecerSegundo' component={RestablecerSegundo} options={{ title: '', headerLeft: null, headerTransparent: true }} />
            <LoginStack.Screen name='RegistroUno' component={RegistroUno} options={{ title: '', headerLeft: null, headerTransparent: true }} />
            <LoginStack.Screen name='RegistroDos' component={RegistroDos} options={{ title: '', headerLeft: null, headerTransparent: true }} />
            <LoginStack.Screen name='RegistroExito' component={RegistroExito} options={{ title: '', headerLeft: null, headerTransparent: true }} />
        </LoginStack.Navigator>
    )
};

export default LoginScreen