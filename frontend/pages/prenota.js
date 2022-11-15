import { useState } from 'react';

import { restaurantOption, reservations, time, place, newsletter, privacy } from './api/local';

import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Seo from '../components/seo/Seo';
import Select from '../components/form/select/Select';
import Button from '../components/form/button/Button';
import Input from '../components/form/input/Input';
import CheckboxGroup from '../components/form/checkbox/CheckboxGroup';

//TODO FORM DI PRENOTAZIONE
/*
    -REFACTORY CODICE!!!
    -Salvare i dati in un db
    -Sistema invio email
    -Sistema di iscrizione e Login
    -UX della form
    -UI della form
*/

export default function Prenota() {

    const today = new Date();

    //Bool disponibilità e messaggio
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');

    //Dati del form
    const [form, setForm] = useState({
        date: today.toLocaleDateString('sv-SE'),
        time: "", //0 => pranzo, 1 => cena
        place: "", //0 => interno, 1 => esterno
        name: "",
        surname: "",
        email: "",
        phone: "",
        newsletter: false,
        privacy: false,
    });

    //Presenza di errori compilazione form
    const [formError, setFormError] = useState({
        date: false,
        time: false,
        place: false,
        name: false,
        surname: false,
        email: false,
        phone: false,
        newsletter: false,
        privacy: false,
    });

    //Al cambio di data imposto su formato corretto il valore del form
    const onChangeDatePicker = (date) => {
        setForm({ ...form, date: date.toLocaleDateString('sv-SE') });
    };

    //Controlla disponibilità
    const checkAvailability = () => {

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let placesAvailable= 0;

        if(form.time && form.date && form.place) {
            //Ciclo tutte le prenotazioni
            //Se sono uguali al giorno, pasto e luogo scelti dall'utente
            //Dichiaro quanti sono i posti già occupati
            reservations.map((reservation) => {
                if(
                    reservation.giorno == form.date &&
                    reservation.pasto == form.time &&
                    reservation.luogo == form.place
                ) {
                    reservedSeats = reservedSeats + reservation.posti;
                }
            });

            //Dichiaro che i posti disponibili sono == ai posti disponibili per la locazione interna
            (form.place == 0) 
            ? placesAvailable = restaurantOption.placesAvailableInside 
            : placesAvailable = restaurantOption.placesAvailableOutside;

            placesAvailable = placesAvailable - reservedSeats;
            
            //Se ci sono posti disponibili allora dichiaro vero la disponibilità e setto il messaggio
            if (placesAvailable > 0) {
                setAvailable(true);
                setMessage(`Per questa giornata sono disponibili ${placesAvailable} posti`);
            } else {
                setAvailable(false);
                setMessage(`Non ci sono posti disponibili per questa giornata`);
            }
            console.log(placesAvailable)
        }

        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            place: form.place === "",
        });
        
    };

    //Verifico che i campi non siano vuoti, se lo sono verranno dichiarati su true
    const handleFormError = () => {
        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            place: form.place === "",
            name: form.name === "",
            surname: form.surname === "",
            email: form.email === "",
            phone: form.phone === "",
            newsletter: form.newsletter === "" || [],
            privacy: form.privacy === "" || [],
        });

        console.log(form);
    }

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
                            { formError.date && <small className={`text-danger`}>Imposta una data</small> }

                            <Select 
                                id='time'
                                label='Scegli il luogo'
                                values={place}
                                onChange={(event) => {
                                    const val = event.target.value;
                                    setForm({ ...form, place: val });
                                }}
                                error={formError.place}
                            />

                            <Select 
                                id='time'
                                label='Scegli il pasto'
                                values={time}
                                onChange={(event) => {
                                    const val = event.target.value;
                                    setForm({ ...form, time: val });
                                }}
                                error={formError.time}
                            />

                            <Button
                                onClick={checkAvailability}
                                text='Verifica disponibilità'
                            />

                            <p>{message}</p>
                            
                            { available && <>

                                <Input
                                    id='name'
                                    label='Name'
                                    type='text'
                                    value={form.name}
                                    onChange={(event) => {
                                        const val = event.target.value;
                                        setForm({ ...form, name: val });
                                    }}
                                    error={formError.name}
                                />
        
                                <Input 
                                    id='surname'
                                    label='Surname'
                                    type='text'
                                    value={form.surname}
                                    onChange={(event) => {
                                        const val = event.target.value;
                                        setForm({ ...form, surname: val });
                                    }}
                                    error={formError.surname}
                                />
        
                                <Input 
                                    id='email'
                                    label='Email'
                                    type='text'
                                    value={form.email}
                                    onChange={(event) => {
                                        const val = event.target.value;
                                        setForm({ ...form, email: val });
                                    }}
                                    error={formError.email}
                                />
                
                                <Input 
                                    id='phone'
                                    label='Phone'
                                    type='tel'
                                    value={form.phone}
                                    onChange={(event) => {
                                        const val = event.target.value;
                                        setForm({ ...form, phone: val });
                                    }}
                                    error={formError.phone}
                                />
                
                                <CheckboxGroup 
                                    values={newsletter}
                                    onChange={(selected) => {
                                        setForm({ ...form, newsletter: selected });
                                    }}
                                />
                
                                <CheckboxGroup 
                                    values={privacy}
                                    onChange={(selected) => {
                                        setForm({ ...form, privacy: selected });
                                    }}
                                    error={formError.privacy}
                                />
                
                                <Button
                                    onClick={handleFormError}
                                    text='Prenota'
                                />

                            </> }

                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
