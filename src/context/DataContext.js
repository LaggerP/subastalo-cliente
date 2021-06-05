import React, {createContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const initialUserData = {
      idPersona: '', //cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
      idCliente: '',//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
      documento: '',
      nombreCompleto: '',
      primerInicio: '',//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
      direccion: '',
      estado: '',
      clienteAdmitido: '',//cambiar este valor, no debería se el inicial. ESTA PARA HACER TEST
      categoria: '',
      nombrePais: '',
      nacionalidad: '',
      capital: '',
      token: ''
  }

  const [userData, setUserData] = useState(initialUserData);
  const [subastas, setSubastas] = useState([]);

  return (
    <DataContext.Provider value={
      {
        userData,
        setUserData,
        subastas,
        setSubastas
      }
    }>
      {children}
    </DataContext.Provider>)
}