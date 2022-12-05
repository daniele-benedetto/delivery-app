import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {

    /*  -----------------------------------------------------------------------------------------------
        CONTEXT DI STATI PER PRENOTAZIONE TAVOLI
    --------------------------------------------------------------------------------------------------- */

    //Dati per registrazione
    const [form, setForm] = useState({
        date: "",
        time: "",
        meal: "", //0 => pranzo, 1 => cena
        place: "", //0 => interno, 1 => esterno
        name: "",
        email: "",
        reservation: "",
        sid: "",
    });  

    //Presenza di errori compilazione form di registrazione
    const [formError, setFormError] = useState({
        date: false,
        place: false,
        name: false,
        email: false,
        reservation: false,
    });   

    //Numero posti disponibili totali
    const [placesNumber, setPlacesNumber] = useState(0);

    //Numero posti disponibili totali all'interno
    const [placesInsideNumber, setPlacesInsideNumber] = useState(0);

    //Numero posti disponibili totali all'esterno
    const [placesOutsideNumber, setPlacesOutsideNumber] = useState(0);

    /*  -----------------------------------------------------------------------------------------------
        CONTEXT DI STATI PER ORDINE PRODOTTO
    --------------------------------------------------------------------------------------------------- */
    
    //Dati per ordine
    const [order, setOrder] = useState({
        name: '',
        email: '',
        products: [],
        address: '', 
        delivery: '', 
        date: '', 
        time: '',
        total: ''
    });

    //Quantità singolo prodotto
    const [qty, setQty] = useState(1);

    //Tutti i prodotti
    const [cartItems, setCartItems] = useState([]);

    //Totale numero prodotti
    const [totalQty, setTotalQty] = useState(0);

    //Totale prezzo
    const [totalPrice, setTotalPrice] = useState(0);

    //Tipo di consegna
    const [delivery, setDelivery] = useState(0);

    //Aumenta di 1 il numero del singolo prodotto
    const incrementQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    //Diminuisce di 1 il numero del singolo prodotto
    //Non può essere meno di uno
    const decrementQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) {
                return 1;
            }
            return prevQty - 1;
        });
    }

    //Aggiungi il prodotto al carrello
    //Se esiste deve sommare la nuova quantità
    const onAdd = (product, quantity) => {

        setTotalQty(prevTotal => prevTotal + quantity);
        setTotalPrice(prevTotal => prevTotal + product.price * quantity);

        const exist = cartItems.find((item) => item.name === product.name);
        if(exist) {
            setCartItems(
                cartItems.map((item) => 
                    item.name === product.name 
                    ? {...exist, quantity: exist.quantity + quantity} 
                    : item
                )
            );
        } else {
            setCartItems([...cartItems, {...product, quantity: quantity}]);
        }
    }

    //Rimuove il prodotto dal carrello
    //Se la quantità è uguale a 1 lo rimuovo definitivamente 
    const onRemove = (product) => {

        setTotalQty(prevTotal => prevTotal - 1);
        setTotalPrice(prevTotal => prevTotal - product.price);

        const exist = cartItems.find((item) => item.name === product.name);

        if(exist.quantity === 1) {
            setCartItems(cartItems.filter((item) => item.name !== product.name));
        } else {
            setCartItems(
                cartItems.map((item) => 
                    item.name === product.name 
                    ? {...exist, quantity: exist.quantity - 1} 
                    : item
                )
            );
        }
    }

    return (
        <Context.Provider value={{ 
            form,
            setForm,
            formError,
            setFormError,
            placesNumber,
            setPlacesNumber,
            placesInsideNumber,
            setPlacesInsideNumber,
            placesOutsideNumber,
            setPlacesOutsideNumber,
            delivery,
            setDelivery,
            qty, 
            incrementQty, 
            decrementQty, 
            cartItems,
            onAdd,
            onRemove,
            totalQty,
            totalPrice,
            setQty,
            order,
            setOrder,
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);