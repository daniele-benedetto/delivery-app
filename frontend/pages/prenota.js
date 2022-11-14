import { useState } from 'react';

import { reservations } from './api/local';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, addMonths } from 'date-fns';

import Seo from '../components/seo/Seo';

let chosenDate= '';
let placesAvailable= 46;

//TODO FORM DI PRENOTAZIONE
/*
    -Verifica del pasto
    -Strutturazione del form di verifica
    -messaggio che comunica esito (si/no, quanti posti)
    -bottone che indica a eseguire la prenotazione
    -Form di prenotazione solo se c'è bisponibilità
    -Oggetto che salvi i dati dei due form
    -Salvare i dati in un db
    -Sistema invio email
    -Sistema di iscrizione e Login
*/

export default function Prenota() {

    const [startDate, setStartDate] = useState(new Date());
    const [available, setAvailable] = useState(false);

    const onChangeDatePicker = (date) => {
        setStartDate(date);
        chosenDate = format(new Date(date), 'yyyy-MM-dd');
    };

    const checkAvailability = () => {
        let reservedSeats= 0;
        reservations.map((reservation) => {
            if(reservation.giorno == chosenDate) {
                reservedSeats = reservedSeats + reservation.posti;
            }
        });

        placesAvailable = placesAvailable - reservedSeats;
        (placesAvailable > 0) ? setAvailable(true) : setAvailable(false);
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
                        <div className={`container text-center d-flex flex-column justify-content-center align-items-center has-bg-image`}>
                            <h1>Prenota</h1>

                            <DatePicker
                                selected={startDate}
                                onChange={onChangeDatePicker}
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 12)}
                                inline
                            />

                            {available && <div>è disponibile</div>}

                            <button className='btn btn-primary' onClick={checkAvailability}>Verifica</button>

                        </div>
                    </section>
                </div>
            </main>
            
        </div>
    );
}
