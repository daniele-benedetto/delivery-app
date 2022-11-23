import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0';

import { useStateContext } from "../../utils/reservation/Context";

import Seo from '../../components/seo/Seo';
import Link from "next/link";

import emailjs from '@emailjs/browser';
import Button from "../../components/form/button/Button";

export default function Riassunto() {
        
    const { 
        form,
        setForm,
    } = useStateContext();

    const route = useRouter(); 
    const { user } = useUser();

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

            <div className={`container-fluid p-0`}>
            
                <Seo 
                    title='Prenota riassunto | RistorApp'
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

                                <Button
                                    onClick={reset}
                                    text='Reset'
                                />
                                
                                <div className='my-5'>
                                    <h3>Riepilogo</h3>
                                    <p>Nome: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Quando: il {form.date} alle {form.time}</p>
                                    <p>Per: {form.reservation} persone</p>
                                    <p>Dove: all'{(form.place == 0) ? 'interno' : 'esterno'}</p>
                                </div>

                                <Button
                                    onClick={addReservation}
                                    text='Conferma'
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
