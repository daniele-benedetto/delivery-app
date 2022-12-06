import { useRouter } from "next/router";
import Image from "next/image";

import { useEffect, useState } from "react";

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';

import { useStateContext } from "../../utils/Context";

import Seo from '../../components/seo/Seo';
import Button from "../../components/form/button/Button";
import Loader from "../../components/loader/Loader";

import image from '../../assets/images/confirm-food.svg';

import { BiLeftArrowAlt } from "react-icons/bi";

export const getServerSideProps = withPageAuthRequired({

    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;
      
        return { props: { user: user } };
    },
    
});

export default function Riassunto({user}) {
        
    const { 
        form,
        setForm,
    } = useStateContext();

    const route = useRouter(); 

    const [loader, setLoader] = useState(false);

    //Se i dati non sono settati correttamente rimanda indietro
    useEffect(() => {
        if(!form.date || !form.time || !form.reservation || !form.place) {
            setForm({
                ...form,
                date: "",
                time: "",
                reservation: "",
                place: "",
            });
            route.push('./calendario');
        }
    },[]);

    //Verifico che i campi obbligatori del form siano compilati
    //Se lo sono salvo i dati su airtable
    //e invio email all'utente
    const addReservation = async () => {

        if(
            form.date &&
            form.time &&
            form.reservation &&
            form.meal == 0 || 1 &&
            form.place
        ) {
            setLoader(true);
            try {         
                const res = await fetch("/api/airtable/createReservation", {
                    method: "POST",
                    body: JSON.stringify({
                        name: user.name, 
                        email: user.email, 
                        date: form.date, 
                        time: form.time, 
                        reservation: parseInt(form.reservation), 
                        meal: form.meal,
                        place: parseInt(form.place),
                        sub: user.sub,
                    }),
                    headers: { "Content-Type": "application/json" },
                });
                    
                const result = await res.json();

                //Parametri di invio email
                const emailjsParams = {
                    name: user.name,
                    email: user.email,
                    reservation: form.reservation,
                    date: form.date,
                    time: form.time,
                    place: (form.place == 1) ? 'esterno' : 'interno',
                }

                //Invio email di feedback
                //emailjs.send(`${process.env.EMAILJS_SERVICE_ID}`, `${process.env.EMAILJS_TEMPLATE_ID}`, emailjsParams, 'xxpN9Yk8U7hQRY0uZ')
                emailjs.send('service_rpt99vg', 'template_9ves2kg', emailjsParams, 'xxpN9Yk8U7hQRY0uZ')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

                setForm({
                    ...form,
                    reservation: "",
                    date: "",
                    time: "",
                    place: "",
                });

                //Reindirizzo alla pagina di conferma
                route.push("/prenota/conferma");
        
            } catch (error) {
                //Reindirizzo alla pagina di errore
                route.push("/prenota/errore");
                console.error(error);
            }
        }
    };

    //Pulisco tutti i campi del form
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

        route.push('./calendario');
        
    }

    if(user) {

        return (

            <div className='column-center-center w-100 h-100'>
            
                <Seo 
                    title='Riassunto | RistorApp'
                    description='Verifica che i dati della tua prenotazione siano corretti e conferma'
                />

                { loader && <Loader />}
            
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
                            alt='Ordina a casa tua' 
                        />
      
                        <div className="mb-20 p-20 card-summary">
                            
                            <div className="card-summary-item">
                                <p>Quando:</p>
                                <p>{form.time ? format(new Date(form.date), 'dd/MM/yyyy') : ''}</p>
                            </div>
                            <div className="card-summary-item mt-20">
                                <p>Alle:</p>
                                <p>{form.time}</p>
                            </div>
                            <div className="card-summary-item mt-20">
                                <p>Per:</p>
                                <p>{form.reservation} persone</p>
                            </div>
                            <div className="card-summary-item mt-20">
                                <p>Dove:</p>
                                <p>all'{(form.place == 0) ? 'interno' : 'esterno'}</p>
                            </div>

                        </div>

                        <Button
                            onClick={addReservation}
                            text='Conferma'
                        />

                    </section>
                </main>
            </div>         
        );
    }
}
