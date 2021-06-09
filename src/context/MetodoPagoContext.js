import React, {createContext, useContext, useEffect, useState} from 'react';
import {DataContext} from "./DataContext";
import apiUrl from "../api";


export const MetodoPagoContext = createContext(null);

export const MetodoPagoProvider = ({children}) => {

  //Usar userData para hacer llamados a la api. Esta posee información como id's de usuario, cliente, tokens y demás
  const {userData} = useContext(DataContext)

  const [metodosDePago, setMetodosDePago] = useState();
  const [metodoPagoElegido, setMetodoPagoElegido] = useState()


  const getMetodosDePago = async () => {
    if (userData){
      return await fetch(`${apiUrl}/api/metodo-de-pago/user/${userData.idCliente}`)
        .then((response) => response.json())
        .then((_metodos) => {
          setMetodosDePago(_metodos[0])
          setMetodoPagoElegido(_metodos[0].tarjetas[0])
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    getMetodosDePago();
  }, []);

  return (
    <MetodoPagoContext.Provider value={
      {
        metodosDePago, metodoPagoElegido, setMetodoPagoElegido
      }
    }>
      {children}
    </MetodoPagoContext.Provider>)
}