import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {

    //Dati del form
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
    
    //Presenza di errori compilazione form
    const [formError, setFormError] = useState({
        date: false,
        place: false,
        name: false,
        email: false,
        reservation: false,
    });    
    
    const [placesNumber, setPlacesNumber] = useState(0);
    const [placesInsideNumber, setPlacesInsideNumber] = useState(0);
    const [placesOutsideNumber, setPlacesOutsideNumber] = useState(0);

    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [delivery, setDelivery] = useState(0);
    
    const incrementQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decrementQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) {
                return 1;
            }
            return prevQty - 1;
        });
    }

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
            console.log(cartItems)
        }

    }

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
            setQty
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);