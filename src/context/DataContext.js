import React, {createContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const initialUserData = {
    idPersona: 6, //cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
    idCliente: 6,//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
    documento: '',
    nombreCompleto: 'Claudio Godio', //TEST
    primerInicio: false,//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
    direccion: '',
    estado: '',
    clienteAdmitido: true,//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
    categoria: '',
    nombrePais: '',
    nacionalidad: '',
    capital: '',
    token: ''
  }

  const [userData, setUserData] = useState(initialUserData);
  const [subastas, setSubastas] = useState([])

  return (
    <DataContext.Provider value={
      {
        userData,
        subastas,
        setSubastas
      }
    }>
      {children}
    </DataContext.Provider>)
}