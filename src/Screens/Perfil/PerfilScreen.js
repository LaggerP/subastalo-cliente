import React from 'react';

// Navigator
import {createStackNavigator} from "@react-navigation/stack";

// Components
import Perfil from "../Perfil/Perfil";
import CategoriaPerfil from "./CategoriaPerfil";

const PerfilStack = createStackNavigator();

const PerfilScreen = () => {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen name='Perfil' component={Perfil} options={{title: 'Perfil', headerTransparent: true, headerShown: false}}/>
      <PerfilStack.Screen name='CategoriaPerfil' component={CategoriaPerfil} options={{title: 'CategoriaPerfil', headerTransparent: true, headerShown: false}}/>
    </PerfilStack.Navigator>
  )
};

export default PerfilScreen