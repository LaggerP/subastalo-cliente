import React, {createContext, useState} from 'react';

export const PujasContext = createContext(null);

export const PujasProvider = ({children}) => {

  const [item, setItem] = useState(null);
  const [idAsistente, setIdAsistente] = useState();


  const getPujas = async () => {
    try {
      let pujas = await fetch(`http://10.0.2.2:3000/api/pujas/catalogo/${item.idItemCatalogo}/`);
      setItem({...item, pujas: await pujas.json()})
    } catch (e) {
      console.error(error);
    }
  }

  const newPuja = async (oferta) => {
    try {
      let puja = await fetch('http://10.0.2.2:3000/api/pujas/new-puja/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(oferta)
      })
      setIdAsistente(await puja.json());
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