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
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);