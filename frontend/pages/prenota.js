import { useState } from 'react';

import { reservations, time } from './api/local';

import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Seo from '../components/seo/Seo';
import Form from '../components/form/Form';
import Select from '../components/form/select/Select';
import Button from '../components/form/button/Button';

//TODO FORM DI PRENOTAZIONE
/*
    -Strutturazione del form di verifica
    -messaggio che comunica esito (si/no, quanti posti, messaggi)
    -Salvare i dati in un db
    -Sistema invio email
    -Sistema di iscrizione e Login
*/

export default function Prenota() {

    const today = new Date();
    const [available, setAvailable] = useState(false);

    const [form, setForm] = useState({
        date: "",
        time: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        newsletter: false,
        privacy: false,
    });

    const [formError, setFormError] = useState({
        date: false,
        time: false,
        name: false,
        surname: false,
        email: false,
        phone: false,
        newsletter: false,
        privacy: false,
    });

    const onChangeDatePicker = (date) => {
        setForm({ ...form, date: date.toLocaleDateString('sv-SE') });
    };

    const checkAvailability = () => {
        let reservedSeats= 0;
        let placesAvailable= 8;
        if(form.time && form.date) {

            reservations.map((reservation) => {
                if(
                    reservation.giorno == form.date &&
                    reservation.pasto == form.time
                ) {
                    reservedSeats = reservedSeats + reservation.posti;
                }
            });


            placesAvailable = placesAvailable - reservedSeats;
            (placesAvailable > 0) ? setAvailable(true) : setAvailable(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    }

    const handleValidForm = () => {
        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            name: form.name === "",
            surname: form.surname === "",
            email: form.email === "",
            phone: form.phone === "",
            newsletter: form.newsletter === "",
            privacy: form.privacy === "",
        });
    };

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

                            <DatePicker
                                onChange={onChangeDatePicker}
                                minDate={today}
                                maxDate={addMonths(today, 12)}
                                inline
                            />

                            <Select 
                                id='time'
                                label='Scegli il pasto'
                                values={time}
                                onChange={(event) => {
                                    const val = event.target.value;
                                    setForm({ ...form, time: val });
                                }}
                            />

                            <Button 
                                onClick={checkAvailability}
                                text='Verifica disponibilità'
                            />
                            
                            {available && <Form handleValidForm={handleValidForm} form={form} setForm={setForm} />}

                        </div>
                    </section>
                </div>
            </main>
            
            <div>
                <pre>
                    <code>{JSON.stringify(form, undefined, 2)}</code>
                </pre>
            </div>
        </div>
    );
}
