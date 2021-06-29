import React, {createContext, useContext, useEffect, useState} from 'react';
import {DataContext} from "./DataContext";
import { apiUrl } from "../api";


export const ProductosContext = createContext(null);

export const ProductosProvider = ({children}) => {

  const {userData} = useContext(DataContext)

  const [newProduct, setNewProduct] = useState({
    disponible: '',
    descripcionCatalogo: '',
    descripcionCompleta: '',
    revisor: 0,
    duenio: 0,
    estado: '',
    categoria: 0,
    fotos: []
  });

  const [productos, setProductos] = useState([]);


  return (
    <ProductosContext.Provider value={
      {
        newProduct,
        setNewProduct,
        productos,
        setProductos
      }
    }>
      {children}
    </ProductosContext.Provider>)
}