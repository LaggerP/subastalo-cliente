import React, {createContext, useEffect, useState} from 'react'
import {AsyncStorage} from "react-native";
import apiUrl from "../api";

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const [userData, setUserData] = useState();
  const [subastas, setSubastas] = useState([]);
  const [sesionIniciada, setSesionIniciada] = useState();

  const autoLogin = async (loginData) => {
    try {
      let loginDatos = await fetch(`${apiUrl}/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      let user = await loginDatos.json();
      setUserData(user.userData);
      if (loginDatos.status === 200) {
        await AsyncStorage.setItem('sesionIniciada', 'true');
        const data = await AsyncStorage.getItem('sesionIniciada');
      }
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    const isLogged = async () => {
      AsyncStorage.multiGet(['email', 'password']).then(async (data) => {
        let loginData = {
          email: data[0][1],
          password: data[1][1],
        }
        if (loginData.email !== null && loginData.password !== null) {
          autoLogin(loginData)
        } else {
          await AsyncStorage.setItem('sesionIniciada', 'false');
        }
      });
    }
    isLogged();

  }, [])

  return (
    <DataContext.Provider value={
      {
        userData,
        setUserData,
        subastas,
        setSubastas,
        autoLogin,
        sesionIniciada,
        setSesionIniciada
      }
    }>
      {children}
    </DataContext.Provider>)
}