import React, {createContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const initialUserData = {
    idUsuario: null,
    NombreCompleto: "",
    Token: ""
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