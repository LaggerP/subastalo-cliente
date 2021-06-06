import React, {createContext, useState} from 'react';
import apiUrl from '../api'

export const PujasContext = createContext(null);

export const PujasProvider = ({children}) => {

  const [item, setItem] = useState(null);


  const getPujas = async () => {
    try {
      let pujas = await fetch(`${apiUrl}/api/pujas/catalogo/${item.idItemCatalogo}/`);
      setItem({...item, pujas: await pujas.json()})
      console.log(item.pujas)
    } catch (e) {
      console.error(error);
    }
  }

  const newPuja = async (oferta) => {
    try {
      let puja = await fetch(`${apiUrl}/api/pujas/new-puja/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(oferta)
      })
      await getPujas();
    } catch (e) {
      console.error(error)
    }
  }

  return (
    <PujasContext.Provider value={
      {
        getPujas, newPuja, item, setItem
      }
    }>
      {children}
    </PujasContext.Provider>)
}