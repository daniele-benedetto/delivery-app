import { useRouter } from "next/router";
import Image from "next/image";

import { useState, useEffect } from "react";

import { useStateContext } from "../../utils/Context";
import { reservations } from '../../utils/Airtable';

import { format } from 'date-fns';

import { ToastContainer, toast } from 'react-toastify';

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { restaurantOption } from '../api/local';

import Seo from '../../components/seo/Seo';
import Button from "../../components/form/button/Button";
import Calendar from "../../components/form/calendar/Calendar";
import Time from "../../components/form/time/Time";
import Loader from "../../components/loader/Loader";

import image from '../../assets/images/food-time.svg';

import {BiLeftArrowAlt} from 'react-icons/bi';

//Verifico l'autenticazione, genero e estraggo i dati da AirTable
export const getServerSideProps = withPageAuthRequired({

    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;

        const today = format(new Date(), "yyyy-MM-dd");
    
        const results = await reservations.select({
            view: "ViewGrid",
            fields: ['date', 'time', 'reservation', 'meal', 'place'],
            filterByFormula: `{date} >= '${today}'`
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
      
        return { props: { user: user, data: data }};
    },
    
});

export default function Calendario({user, data}) {

    const route = useRouter(); 
    const [loader, setLoader] = useState(false);
    const [selectTime, setSelectTime] = useState('');
    const [selectDate, setSelectDate] = useState('');

    //Parametri di notifica in caso non ci siano posti disponibili
    const notify = () => {
        toast.error(`Non ci sono posti disponibili per questa giornata a ${(form.meal == 0) ? 'pranzo' : 'cena'}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    //Pulisco tutti i campi del form e rimando in home
    const reset = () => {

        setLoader(true);

        setForm({
            ...form,
            date: "",
            time: "",
            meal: "", //0 => pranzo, 1 => cena
            place: "", //0 => interno, 1 => esterno
            reservation: "",
        });

        route.push('/');
        
    }

    const { 
        form,
        setForm,
        formError,
        setFormError,
        setPlacesNumber,
        setPlacesInsideNumber,
        setPlacesOutsideNumber,
    } = useStateContext();

    const setMeal = () => {

        if(form.date && form.time) {
            const today = format(new Date(), "yyyy-MM-dd");
            let dateSelect  = new Date([today, form.time]);
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
        }

        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === ""
        }); 
    }

    //Controlla disponibilità
    const checkAvailability = () => {

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let reservedSeatsInside=0;
        let reservedSeatsOutside=0;

        let placesAvailableInside = restaurantOption.placesAvailableInside;
        let placesAvailableOutside = restaurantOption.placesAvailableOutside;
        let placesAvailable= restaurantOption.totalPlaces;

        if(form.date && form.time) {

            //Ciclo tutte le prenotazioni
            //Se sono uguali al giorno, pasto e luogo scelti dall'utente
            //Dichiaro quanti sono i posti già occupati
            data.props.data.map((reservation) => {
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
                
            //Se ci sono posti disponibili allora dichiaro vero la disponibilità
            if (placesAvailable > 0) {
                setLoader(true);
                setPlacesNumber(placesAvailable);
                setPlacesInsideNumber(placesAvailableInside);
                setPlacesOutsideNumber(placesAvailableOutside);
                route.push('./dati');
            } else {
                setPlacesNumber(0);
                setPlacesInsideNumber(0);
                setPlacesOutsideNumber(0);
                setSelectTime('');
                setSelectDate('');
                setForm({ 
                    ...form, 
                    date: "",
                    time: "",
                    meal: "",
                });
                notify();
            }
        }    
    };  

    useEffect(() => {
        checkAvailability();
    },[form.meal]);

    if(user) {

        return (

            <div className='column-center-center w-100 h-100'>
            
                <Seo 
                    title='Calendario | RistorApp'
                    description="Prenota selezionando data e orario"
                />

                {loader && <Loader /> }

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                                
                <main className='w-100 p-20'>

                    <section className='column-center-center h-100 pos-rel'>

                        <BiLeftArrowAlt 
                            size={30}
                            color={'var(--black)'}
                            className='button-reset'
                            onClick={reset}
                        />
                        
                        <Image
                            width={250}
                            height={250}
                            src={image} 
                            alt='Scegli data e ora' 
                        />

                        <div className='column-center-center p-20 w-100 pos-rel'>

                            <Calendar
                                form={form}
                                setForm={setForm}
                                formError={formError}
                                restaurantOption={restaurantOption}
                                error={formError.date}
                                selectDate={selectDate}
                                setSelectDate={setSelectDate}
                            />

                            <Time
                                form={form}
                                setForm={setForm}
                                formError={formError}
                                restaurantOption={restaurantOption}
                                error={formError.time}
                                selectTime={selectTime}
                                setSelectTime={setSelectTime}
                            />

                            <Button
                                onClick={() => {
                                    setMeal();
                                }}
                                text='Verifica disponibilità'
                            />

                        </div>
                    </section>
                </main>
            </div>         
        );
    }
}