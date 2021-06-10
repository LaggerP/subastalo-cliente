import React, { useContext, useEffect, useState } from 'react';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import DashboardScreen from "./src/Screens/Dashboard/DashboardScreen";
import SubastaScreen from "./src/Screens/Subasta/SubastaScreen";
import LoginScreen from "./src/Screens/Login/LoginScreen";

// Providers
import { DataProvider } from "./src/context/DataContext";

//Linking
// import * as Linking from "expo-linking";

const AuthStack = createStackNavigator();

// const prefix = Linking.makeUrl("/");

export default function App() {

  // const [data, setData] = useState(null);

  // const linking = {
  //   prefixes: [prefix],
  //   config: {
  //     screens: {
  //       LoginScreen: {
  //         screens: {
  //           RegistroDos: 'RegistroDos',
  //         }
  //       }
  //     }
  //   }
  // };

  // const url = Linking.useURL();
  // console.log(url);

  // function handleDeepLink(event) {
  //   let data = Linking.parse(event.url);
  //   setData(data);
  // }

  // useEffect(() => {

  //   async function getInitialURL() {
  //     const initialURL = await Linking.getInitialURL();
  //     if {initialURL}.setData(Linking.parse(initialURL));
  //   }

  //   Linking.addEventListener("url", handleDeepLink);
  //   if (!data) {
  //     getInitialURL();
  //   }

  //   return () => {
  //     Linking.removeEventListener("url");
  //   };
  // }, []);

  // console.log(data);

  return (
    <DataProvider>
      <NavigationContainer >
        <AuthStack.Navigator>
          <AuthStack.Screen name='DashboardScreen' component={DashboardScreen} options={{ title: '', headerShown: false }} />
          <AuthStack.Screen name='SubastaScreen' component={SubastaScreen} options={{ title: 'SubastaScreen', headerShown: false }} />
          <AuthStack.Screen name='LoginScreen' component={LoginScreen} options={{ title: '', headerShown: false }} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
