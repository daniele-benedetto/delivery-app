import Seo from '../components/seo/Seo';
import FormReservation from '../components/form/FormReservation';

//TODO FORM DI PRENOTAZIONE
/*
    -Sistema invio email
    -Sistema di iscrizione e Login
    -REFACTORY E OTTIMIZZAZIONE
    -UX della form
    -UI della form
*/

export default function Prenota() {

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
                            <FormReservation />                                     
                        </div>
                    </section>
                </div>
            </main>
        </div>
        
    );
}
