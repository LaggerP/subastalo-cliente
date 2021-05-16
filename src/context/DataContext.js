import React, {createContext, useState} from 'react'

export const DataContext = React.createContext(null);


const initialData = {
   id: 1,
   name: "Pepe"
}

export const DataProvider = ({children}) => {
   const [data, setData] = useState(initialData);

   return (<DataContext.Provider value={{data, setData}}> {children} </DataContext.Provider>)
}