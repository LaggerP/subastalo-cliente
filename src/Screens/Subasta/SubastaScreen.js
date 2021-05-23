import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import NuevaPuja from "./NuevaPuja";
import ItemSubasta from "./ItemSubasta";

const SubastaStack = createStackNavigator();

const SubastaScreen = () => {
  return (

    <SubastaStack.Navigator>
      <SubastaStack.Screen name='ItemSubasta' component={ItemSubasta} options={{title: 'ItemSubasta', headerShown: false}}/>
      <SubastaStack.Screen name='NuevaPuja' component={NuevaPuja} options={{title: 'NuevaPuja', headerShown: false}}/>
    </SubastaStack.Navigator>
  )

};

export default SubastaScreen