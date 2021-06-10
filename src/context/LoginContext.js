import React, {createContext, useState} from 'react'

export const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {

  const [userMail, setUserMail] = useState();

  return (
    <LoginContext.Provider value={
      {
        userMail,
        setUserMail,
      }
    }>
      {children}
    </LoginContext.Provider>)
}