import React, {createContext, useContext, useEffect, useState} from 'react';
import {DataContext} from "./DataContext";
import { apiUrl } from "../api";


export const ProductosContext = createContext(null);

export const ProductosProvider = ({children}) => {

  const {userData} = useContext(DataContext)

  const [productos, setProductos] = useState([]);


  return (
    <ProductosContext.Provider value={
      {
        productos,
        setProductos,
      }
    }>
      {children}
    </ProductosContext.Provider>)
}