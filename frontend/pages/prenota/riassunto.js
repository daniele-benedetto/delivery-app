import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { useStateContext } from "../../utils/reservation/Context";

import emailjs from '@emailjs/browser';

import Seo from '../../components/seo/Seo';
import Button from "../../components/form/button/Button";
import Loader from "../../components/loader/Loader";

import homeImage from '../../assets/images/confirm-food.svg';

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

                const emailjsParams = {
                    name: user.name,
                    email: user.email,
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
                    title='Prenota riassunto | RistorApp'
                    description='La tua app per ordinare su RistorApp'
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
                            src={homeImage} 
                            alt='Ordina a casa tua' 
                        />

                        <h1 className='font-normal font-semibold'>
                            Verifica e <b className='color-primary font-bold'>Conferma</b>
                        </h1>
      
                        <div className="mb-20 p-20 card-summary">
                            <p>Quando: il {form.date}</p>
                            <p>Alle: {form.time}</p>
                            <p>Per: {form.reservation} persone</p>
                            <p className="mb-0">Dove: all'{(form.place == 0) ? 'interno' : 'esterno'}</p>
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
