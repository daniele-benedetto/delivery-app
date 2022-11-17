import { useState } from 'react';

import { restaurantOption, reservationsData, placeData, mealData, newsletterData, privacyData } from './api/local';

import Seo from '../components/seo/Seo';
import ReservationFormStepOne from '../components/form/reservationForm/ReservationFormStepOne';
import ReservationFormStepTwo from '../components/form/reservationForm/ReservationFormStepTwo';

//TODO FORM DI PRENOTAZIONE
/*
    -Salvare il pasto in base alla scelta dell'orario
    -Salvare i dati in un db
    -Sistema invio email
    -Sistema di iscrizione e Login
    -UX della form
    -UI della form
*/

export default function Prenota() {

    //Bool disponibilità e messaggio
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');

    //Dati del form
    const [form, setForm] = useState({
        date: "",
        time: "",
        meal: "", //0 => pranzo, 1 => cena
        place: "", //0 => interno, 1 => esterno
        name: "",
        surname: "",
        email: "",
        phone: "",
        newsletter: [],
        privacy: [],
    });

    //Presenza di errori compilazione form
    const [formError, setFormError] = useState({
        date: false,
        time: false,
        meal: false,
        place: false,
        name: false,
        surname: false,
        email: false,
        phone: false,
        newsletter: false,
        privacy: false,
    });

    return (
        <div className={`container-fluid p-0`}>

            <Seo 
                title='Prenota | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <main className={`container-fluid`}>
                <div className={`row`}>
                    <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                        <div className={`container`}>
                            <h1>Prenota</h1>

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
                            /> }

                        </div>
                    </section>
                </div>
            </main>

            <div className='mt-5'>
                <pre>
                    <code>{JSON.stringify(form, undefined, 2)}</code>
                </pre>
            </div>

        </div>
        
    );
}
