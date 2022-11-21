import { useState } from 'react';
import { useRouter } from 'next/router';

import { format } from 'date-fns';

import emailjs from '@emailjs/browser';

import Calendar from './calendar/Calendar';
import Select from './select/Select';
import Button from './button/Button';

import { restaurantOption, placeData } from '../../pages/api/local';

export default function FormReservation({atReservation, user}) {
    
    //Dati del form
    const [form, setForm] = useState({
        date: "",
        time: "",
        meal: "", //0 => pranzo, 1 => cena
        place: "", //0 => interno, 1 => esterno
        name: `${user.name}`,
        email: `${user.email}`,
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

    const [message, setMessage] = useState('');
    const [available, setAvailable] = useState(false);
    const [placesNumber, setPlacesNumber] = useState(0);

    const router = useRouter();

    let placesSelect = new Object();
    let placesArray = [];

    //Controlla disponibilità
    const checkAvailability = (e) => {

        e.preventDefault();

        const today = format(new Date(), "yyyy-MM-dd");
        let dateSelect  = new Date([today, form.time]);

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let placesAvailable= 0;
    
        if(form.date && form.time && form.place) {

            //Verifico la fascia oraria scelta e se è pranzo o cena
            if(
                format(dateSelect, 'H:mm') >= restaurantOption.openTime.lunch.start && 
                format(dateSelect, 'H:mm') <= restaurantOption.openTime.lunch.finish
            ) {
                setForm({ ...form, meal: 0});
            } else if(
                form.time >= restaurantOption.openTime.dinner.start && 
                form.time <= restaurantOption.openTime.dinner.finish
            ) {
                setForm({ ...form, meal: 1});
            }

            //Ciclo tutte le prenotazioni
            //Se sono uguali al giorno, pasto e luogo scelti dall'utente
            //Dichiaro quanti sono i posti già occupati
            atReservation.map((reservation) => {
                if(
                    reservation.date == form.date &&
                    reservation.meal == form.meal &&
                    reservation.place == form.place
                ) {
                    console.log(reservation)
                    reservedSeats = reservedSeats + reservation.reservation;
                }
            });
    
            //Dichiaro che i posti disponibili sono == ai posti disponibili per la locazione scelta
            (form.place == 0) 
            ? placesAvailable = restaurantOption.placesAvailableInside 
            : placesAvailable = restaurantOption.placesAvailableOutside;
    
            placesAvailable = placesAvailable - reservedSeats;
                
            //Se ci sono posti disponibili allora dichiaro vero la disponibilità e setto il messaggio
            if (placesAvailable > 0 && placesAvailable >= form.reservation) {
                setAvailable(true);
                setMessage(`Per il giorno ${form.date} alle ${form.time} sono disponibili ${placesAvailable} posti all'${(form.meal == 0) ? 'interno' : 'esterno'}`);
                setPlacesNumber(placesAvailable);
                generatePlacesNumberSelect();
            } else {
                setAvailable(false);
                setMessage(`Non ci sono posti disponibili per questa giornata`);
                setPlacesNumber(0);
            }
        }
    
        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
            place: form.place === "",
        });    
    };

    //Generazione dinamica del numero di posti disponibili
    const generatePlacesNumberSelect = () => {

        let index = 0;
        let i = 0;
        let number = [];

        //Genero un array contentente il singoli posti disponili
        while (index < placesNumber){
            index++
            number.push(index);
        }
        
        //Ciclo i singoli posti per generare un array di oggetti
        //L'array di oggetti sarà la variabile che passerò al select
        //per generare le singole opzioni
        for (i=1; i<=number.length; i++){
            placesSelect = new Object();
            placesSelect['id'] = i;
            placesSelect['time'] = i;
            placesArray.push(placesSelect);
        }

    }

    //Pulisco tutti i campi del form
    const reset = (e) => {

        e.preventDefault();

        setForm({
            ...form,
            date: "",
            time: "",
            meal: "", //0 => pranzo, 1 => cena
            place: "", //0 => interno, 1 => esterno
            reservation: "",
        });

        setAvailable(false);
        setMessage('');
        
    }

    //Verifico che i campi obbligatori del form siano compilati
    //Se lo sono salvo i dati su airtable
    //e invio email all'utente
    const addReservation = async (e) => {

        e.preventDefault();

        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            meal: form.meal === "",
            place: form.place === "",
            reservation: form.reservation === "",
        });

        if(
            form.name &&
            form.email &&
            form.date &&
            form.time &&
            form.reservation &&
            form.meal == 0 || 1 &&
            form.place
        ) {
            try {         
                const res = await fetch("/api/airtable/createReservation", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name, 
                        email: form.email, 
                        date: form.date, 
                        time: form.time, 
                        reservation: parseInt(form.reservation), 
                        meal: form.meal,
                        place: parseInt(form.place),
                    }),
                    headers: { "Content-Type": "application/json" },
                });
                    
                const result = await res.json();

                const emailjsParams = {
                    name: form.name,
                    email: form.email,
                    reservation: form.reservation,
                    date: form.date,
                    time: form.time,
                    place: (form.place == 1) ? 'esterno' : 'interno',
                }

                //Invio email di feedback
                emailjs.send('service_rpt99vg', 'template_9ves2kg', emailjsParams, 'xxpN9Yk8U7hQRY0uZ')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

                //Reindirizzo alla pagina di conferma
                router.push("/prenota/conferma");
        
            } catch (error) {
                //Reindirizzo alla pagina di errore
                router.push("/prenota/errore");
                console.error(error);
            }
        }
    };
    
    return (
        <form>

            { !available && <>

                <Calendar
                form={form}
                setForm={setForm}
                formError={formError}
                restaurantOption={restaurantOption}
                error={formError.date}
                />

                <Select
                id='place'
                label='Scegli il luogo'
                values={placeData}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, place: val });
                }}
                error={formError.place}
                />

                <Button
                onClick={checkAvailability}
                text='Verifica disponibilità'
                />

                <p>{message}</p>

            </> }

            { available && !form.reservation && <>

                <p>{message}</p>

                <Select
                    id='reservation'
                    label='Per quante persone vuoi prenotare?'
                    values={placesArray}
                    onChange={(event) => {
                        const val = event.target.value;
                        setForm({ ...form, reservation: val });
                    }}
                    error={formError.reservation}
                />
            
            </> }
            
            { available && form.reservation && <>
                
                <Button
                    onClick={reset}
                    text='Reset'
                />

                <div className='my-5'>
                    <h3>Riepilogo</h3>
                    <p>Nome: {form.name}</p>
                    <p>Email: {form.email}</p>
                    <p>Quando: il {form.date} alle {form.time}</p>
                    <p>Per: {form.reservation} persone</p>
                    <p>Dove: all'{(form.place == 0) ? 'interno' : 'esterno'}</p>
                </div>
               
                <Button
                    onClick={addReservation}
                    text='Conferma'
                />

            </> }

        </form>
        
    );
}