import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useStateContext } from "../../utils/reservation/Context";
import { table } from '../../utils/Airtable';

import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

import { useUser } from '@auth0/nextjs-auth0';

import { restaurantOption } from '../api/local';

import Seo from '../../components/seo/Seo';
import Button from "../../components/form/button/Button";
import Calendar from "../../components/form/calendar/Calendar";

export async function getStaticProps() {

    const results = await table.select({
        view: "ViewGrid",
    }).all();
  
    const data = {
      props: {
            data: results.map(result => {
                return {
                    id: result.id,
                    ...result.fields,
                }
            })
        }
    }
  
    return data;
}

export default function Calendario({data}) {

    const route = useRouter(); 
    const { user } = useUser();

    const [message, setMessage] = useState('');

    const { 
        form,
        setForm,
        formError,
        setFormError,
        setPlacesNumber,
        setPlacesInsideNumber,
        setPlacesOutsideNumber,
    } = useStateContext();

    //Controlla disponibilità
    const checkAvailability = () => {

        const today = format(new Date(), "yyyy-MM-dd");
        let dateSelect  = new Date([today, form.time]);

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let reservedSeatsInside=0;
        let reservedSeatsOutside=0;

        let placesAvailableInside = restaurantOption.placesAvailableInside;
        let placesAvailableOutside = restaurantOption.placesAvailableOutside;
        let placesAvailable= restaurantOption.totalPlaces;

        if(form.date && form.time) {

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
            data.map((reservation) => {
                if(
                    reservation.date == form.date &&
                    reservation.meal == form.meal
                ) {
                    reservedSeats = reservedSeats + reservation.reservation;
                    if(reservation.place == 0) {
                        reservedSeatsInside = reservedSeatsInside + reservation.reservation;
                    } else {
                        reservedSeatsOutside = reservedSeatsOutside + reservation.reservation;
                    }
                }
            });

            placesAvailable = placesAvailable - reservedSeats;
            placesAvailableInside = placesAvailableInside - reservedSeatsInside;
            placesAvailableOutside = placesAvailableOutside - reservedSeatsOutside;
                
            //Se ci sono posti disponibili allora dichiaro vero la disponibilità e setto il messaggio
            if (placesAvailable > 0) {
                setPlacesNumber(placesAvailable);
                setPlacesInsideNumber(placesAvailableInside);
                setPlacesOutsideNumber(placesAvailableOutside);
                route.push('./dati');
            } else {
                setPlacesNumber(0);
                setPlacesInsideNumber(0);
                setPlacesOutsideNumber(0);
                setMessage('Non ci sono posti disponibili per questa giornata');
            }
        } 

        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
        });    

    };  

    if(user) {

        return (

            <div className={`container-fluid p-0`}>
            
                <Seo 
                    title='Prenota calendario | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                <button onClick={() => route.push("/api/auth/logout")}>ESCI</button>
            
                <main className={`container-fluid`}>
                    <div className={`row`}>
                        <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                            <div className={`container border d-flex justify-content-center flex-column`}>
                                <div>
                                    <pre>
                                        <code>{JSON.stringify(form, undefined, 2)}</code>
                                    </pre>
                                </div>

                                <Calendar
                                    form={form}
                                    setForm={setForm}
                                    formError={formError}
                                    restaurantOption={restaurantOption}
                                    error={formError.date}
                                />

                                {message}

                                <Button
                                    onClick={checkAvailability}
                                    text='Verifica disponibilità'
                                />

                            </div>
                        </section>
                    </div>
                </main>
            </div>         
        );
        
    } else {
        return (
            <Link href='/api/auth/login'>Accedi</Link>
        );
    }
}