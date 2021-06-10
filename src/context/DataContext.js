import React, {createContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

  const [userData, setUserData] = useState();
  const [subastas, setSubastas] = useState([]);
  const [userMailForgot, setUserMailForgot] = useState();

  return (
    <DataContext.Provider value={
      {
        userData,
        setUserData,
        subastas,
        setSubastas,
        userMailForgot,
        setUserMailForgot,
      }
    }>
      {children}
    </DataContext.Provider>)
}