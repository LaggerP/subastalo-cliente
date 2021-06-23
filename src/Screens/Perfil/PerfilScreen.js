import React from 'react';

// Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Perfil from "../Perfil/Perfil";
import CategoriaPerfil from "./CategoriaPerfil";
import FotoPerfil from "./FotoPerfil";
import RestablecerPrimer from "../Login/RestablecerPrimer";
import RestablecerSegundo from "../Login/RestablecerSegundo";

const PerfilStack = createStackNavigator();

const PerfilScreen = () => {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen name='Perfil' component={Perfil} options={{ title: 'Perfil', headerShown: false }} />
      <PerfilStack.Screen name='CategoriaPerfil' component={CategoriaPerfil} options={{ title: 'CategoriaPerfil', headerTransparent: true, headerShown: false }} />
      <PerfilStack.Screen name='FotoPerfil' component={FotoPerfil} options={{ title: 'FotoPerfil', headerShown: false }} />
      <PerfilStack.Screen name='RestablecerPrimer' component={RestablecerPrimer} options={{ title: '', headerLeft: null, headerTransparent: true }} />
      <PerfilStack.Screen name='RestablecerSegundo' component={RestablecerSegundo} options={{ title: '', headerLeft: null, headerTransparent: true }} />
    </PerfilStack.Navigator>
  )
};

export default PerfilScreen