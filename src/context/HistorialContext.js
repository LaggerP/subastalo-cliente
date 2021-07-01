import React, {createContext, useState} from 'react'

export const HistorialContext = createContext(null);

export const HistorialProvider = ({children}) => {

  const [userMail, setUserMail] = useState();

  return (
    <HistorialContext.Provider value={
      {
        userMail,
        setUserMail,
      }
    }>
      {children}
    </HistorialContext.Provider>)
}