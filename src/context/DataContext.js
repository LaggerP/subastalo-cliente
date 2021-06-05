import React, {createContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const [userData, setUserData] = useState();
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