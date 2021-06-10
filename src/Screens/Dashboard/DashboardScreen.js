import React from 'react';

// Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Dashboard from "./Dashboard";
import Perfil from "../Perfil/Perfil";

const DashboardStack = createStackNavigator();

const DashboardScreen = () => {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen name='Dashboard' component={Dashboard} options={{ title: '', headerTransparent: true, cardStyle: { backgroundColor: '#FC9905' } }} />
            <DashboardStack.Screen name='Perfil' component={Perfil} options={{ title: 'Perfil', headerTransparent: true }} />
        </DashboardStack.Navigator>
    )
};

export default DashboardScreen