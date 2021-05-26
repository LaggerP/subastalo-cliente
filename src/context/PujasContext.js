import React, {createContext, useState} from 'react';

export const PujasContext = createContext(null);

export const PujasProvider = ({children}) => {

  const [item, setItem] = useState(null);
  const [idAsistente, setIdAsistente] = useState();

  const getItemSubastandose = async (idSubasta) => {
    return await fetch(`http://10.0.2.2:3000/api/subastas/catalogo/${idSubasta}/item-catalogo`)
      .then((response) => response.json())
      .then((_itemData) => {
        setItem(_itemData)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getPujas = async () => {
    return await fetch(`http://10.0.2.2:3000/api/pujas/catalogo/${item.idItemCatalogo}/`)
      .then((response) => response.json())
      .then((_newPujas) => {
        setItem({...item, pujas: _newPujas})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const newPuja = async (oferta) => {
    await fetch('http://10.0.2.2:3000/api/pujas/new-puja/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(oferta)
    }).then(async res => {
      setIdAsistente(await res.json())
      getPujas()
    }).catch((error) => console.log(error))
  }

  return (
    <PujasContext.Provider value={
      {
        getItemSubastandose, getPujas, newPuja, item
      }
    }>
      {children}
    </PujasContext.Provider>)
}