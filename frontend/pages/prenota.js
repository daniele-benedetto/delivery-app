import Form from '../components/form/Form';
import Seo from '../components/seo/Seo';

//TODO FORM DI PRENOTAZIONE
/*
    -Componente Message per segnalare se disponibile
     n° posti tal giorno tal ora
    -Salvare i dati in un db
    -Sistema invio email
    -Sistema di iscrizione e Login
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
                            <Form />
                        </div>
                    </section>
                </div>
            </main>
        </div>
        
    );
}
