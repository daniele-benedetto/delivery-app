import { useState } from 'react';

import { restaurantOption, reservationsData, placeData, mealData, newsletterData, privacyData } from '../../pages/api/local';

import ReservationFormStepOne from './reservationForm/ReservationFormStepOne';
import ReservationFormStepTwo from './reservationForm/ReservationFormStepTwo';

export default function Form() {

    //Bool disponibilità e messaggio
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');

    //Dati del form
    const [form, setForm] = useState({
        name: "", 
        surname: "", 
        email: "", 
        phone: "", 
        date: "", 
        time: "", 
        reservation: "", 
        meal: "", 
        place: "", 
        privacy: "",
        newsletter: ""
    });

    //Presenza di errori compilazione form
    const [formError, setFormError] = useState({
        date: false,
        place: false,
        name: false,
        surname: false,
        email: false,
        phone: false,
        reservation: false,
        newsletter: false,
        privacy: false,
    });
    
    return (
        <>
            { !available && <ReservationFormStepOne 
                form={form}
                setForm={setForm}
                formError={formError}
                setFormError={setFormError}
                restaurantOption={restaurantOption}
                placeData={placeData}
                message={message}
                setMessage={setMessage}
                mealData={mealData}
                reservationsData={reservationsData}
                setAvailable={setAvailable}
            /> }
            
            { available && <ReservationFormStepTwo 
                form={form}
                setForm={setForm}
                formError={formError}
                setFormError={setFormError}
                newsletterData={newsletterData}
                privacyData={privacyData}
                setAvailable={setAvailable}
                message={message}
            /> }
        </>
    );
}