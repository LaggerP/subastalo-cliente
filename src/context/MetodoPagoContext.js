import React, {createContext, useContext, useEffect, useState} from 'react';
import {DataContext} from "./DataContext";


export const MetodoPagoContext = createContext(null);

export const MetodoPagoProvider = ({children}) => {

  //Usar userData para hacer llamados a la api. Esta posee información como id's de usuario, cliente, tokens y demás
  const {userData} = useContext(DataContext)

  const [metodosDePago, setMetodosDePago] = useState();
  const [metodoPagoElegido, setMetodoPagoElegido] = useState()


  const getMetodosDePago = async () => {
    return await fetch(`http://10.0.2.2:3000/api/metodo-de-pago/user/${userData.idCliente}`)
      .then(async (response) => await response.json())
      .then((_metodos) => {
        setMetodosDePago(_metodos[0])
        setMetodoPagoElegido(_metodos[0].tarjetas[0])
      })
      .catch((error) => {
        console.error(error);
      });
  }


  useEffect(() => {
    getMetodosDePago();
  }, []);

  return (
    <MetodoPagoContext.Provider value={
      {
        metodosDePago, metodoPagoElegido, setMetodoPagoElegido, getMetodosDePago
      }
    }>
      {children}
    </MetodoPagoContext.Provider>)
}