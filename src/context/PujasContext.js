import React, {createContext, useState} from 'react';
import apiUrl from '../api'
import socketClient from "socket.io-client";

export const PujasContext = createContext(null);

export const PujasProvider = ({children}) => {
  const [socket, setSocket] = useState(socketClient (`${apiUrl}/socket-pujas`));
  const [item, setItem] = useState(null);
  const [downCountClock, setDownCountClock] = useState(60 * 50);

  const getPujas = async () => {
    console.log("hola traigo nuevas pujas")
    try {
      let pujas = await fetch(`${apiUrl}/api/pujas/catalogo/${item.idItemCatalogo}/`);
      setItem({...item, pujas: await pujas.json()})
    } catch  {
    }
  }

  const newPuja = async (oferta) => {

    if (item.pujas.length > 0) {
      const exist = item.pujas.find(element => element.importe === oferta.importe)
      const lastPuja = item.pujas[0].idCliente === oferta.idCliente
      if (!exist && !lastPuja) {
        try {
          let puja = await fetch(`${apiUrl}/api/pujas/new-puja/`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(oferta)
          })
          const room = `${item.idSubasta}pujas`
          socket.emit('pujas', {reload: true})
          return await puja.json()
        } catch {
        }
      } else {
        return {existe: exist !== undefined, ultima: lastPuja}
      }
    } else {
      try {
        let puja = await fetch(`${apiUrl}/api/pujas/new-puja/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(oferta)
        })
        const room = `${item.idSubasta}pujas`
        socket.emit('pujas', {reload: true})
        return await puja.json()
      } catch {
      }
    }
  }

  return (
    <PujasContext.Provider value={
      {
        getPujas, newPuja, item, setItem, downCountClock, setDownCountClock, socket
      }
    }>
      {children}
    </PujasContext.Provider>)
}