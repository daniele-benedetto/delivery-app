import { useState } from 'react';

import { format } from 'date-fns';

import Input from './input/Input';
import Calendar from './calendar/Calendar';
import Select from './select/Select';
import Button from './button/Button';
import CheckboxGroup from './checkbox/CheckboxGroup';

import { restaurantOption, reservationsData, placeData, newsletterData, privacyData } from '../../pages/api/local';

export default function FormReservation() {
    
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
        reservation: "",
        newsletter: [],
        privacy: [],
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

    const [message, setMessage] = useState('');
    const [available, setAvailable] = useState(false);
    const [placesNumber, setPlacesNumber] = useState(0);

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
                format(dateSelect, 'H:mm') >= restaurantOption.openTimeTest.lunch.start && 
                format(dateSelect, 'H:mm') <= restaurantOption.openTimeTest.lunch.finish
            ) {
                setForm({ ...form, meal: 0});
            } else if(
                form.time >= restaurantOption.openTimeTest.dinner.start && 
                form.time <= restaurantOption.openTimeTest.dinner.finish
            ) {
                setForm({ ...form, meal: 1});
            }

            //Ciclo tutte le prenotazioni
            //Se sono uguali al giorno, pasto e luogo scelti dall'utente
            //Dichiaro quanti sono i posti già occupati
            reservationsData.map((reservation) => {
                if(
                    reservation.giorno == form.date &&
                    reservation.pasto == form.meal &&
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
                setMessage(`Per il giorno ${form.date} alle ${form.time} sono disponibili ${placesAvailable} posti`);
                setPlacesNumber(placesAvailable);
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
        while (index<placesNumber){
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

    generatePlacesNumberSelect();

    //Pulisco tutti i campi del form
    const reset = (e) => {

        e.preventDefault();

        setForm({
            ...form,
            date: "",
            time: "",
            meal: "", //0 => pranzo, 1 => cena
            place: "", //0 => interno, 1 => esterno
            name: "",
            surname: "",
            email: "",
            phone: "",
            reservation: "",
            newsletter: [],
            privacy: [],
        });

        setAvailable(false);
        setMessage('');
        
    }

    //Verifico che i campi non siano vuoti, se lo sono verranno dichiarati su true
    const handleFormError = (e) => {

        e.preventDefault();

        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            meal: form.meal === "",
            place: form.place === "",
            name: form.name === "",
            surname: form.surname === "",
            email: form.email === "",
            phone: form.phone === "",
            reservation: form.reservation === "",
            privacy: form.privacy.length === 0,
        });
    }

    const addReservation = async (e) => {

        e.preventDefault();

        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            meal: form.meal === "",
            place: form.place === "",
            name: form.name === "",
            surname: form.surname === "",
            email: form.email === "",
            phone: form.phone === "",
            reservation: form.reservation === "",
            privacy: form.privacy.length === 0,
        });

        if(
            form.name &&
            form.surname &&
            form.email &&
            form.phone &&
            form.date &&
            form.time &&
            form.reservation &&
            form.meal &&
            form.place &&
            form.privacy
        ) {
            try {         
                const res = await fetch("/api/reservation", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name, 
                        surname: form.surname, 
                        email: form.email, 
                        phone: form.phone, 
                        date: form.date, 
                        time: form.time, 
                        reservation: parseInt(form.reservation), 
                        meal: form.meal,
                        place: parseInt(form.place),
                        privacy: form.privacy.toString(),
                        newsletter: form.newsletter.toString() || '0'
                    }),
                    headers: { "Content-Type": "application/json" },
                });
                    
                const result = await res.json();
        
            } catch (error) {
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

            </> }

            <p>{message}</p>

            { available && <>
                <Button
                onClick={reset}
                text='Reset'
            />  

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
                    
                <CheckboxGroup
                    values={newsletterData}
                    onChange={(selected) => {
                        setForm({ ...form, newsletter: selected });
                    }}
                    error={formError.newsletter}
                />
                    
                <CheckboxGroup 
                    values={privacyData}
                    onChange={(selected) => {
                        setForm({ ...form, privacy: selected });
                    }}
                    error={formError.privacy}
                />
                    
                <Button
                    onClick={addReservation}
                    text='Prenota'
                />

            </> }

        </form>
    );
}