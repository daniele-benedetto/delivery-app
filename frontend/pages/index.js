import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Seo from '../components/seo/Seo';
import Header from "../components/header/Header";
import Loader from "../components/loader/Loader";
import Location from "../components/location/Location";

import homeImage from '../assets/images/order-food.svg';

export default function Home() {

    const [loader, setLoader] = useState(false);

    return (
        <div className='column-center-center w-100 h-100'>

            <Seo 
                title='Home | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            { loader && <Loader /> }

            <Header />

            <main className='w-100 p-20'>

                <section className='column-center-center h-100'>

                    <Image
                        width={250}
                        height={250}
                        src={homeImage} 
                        alt='Ordina a casa tua' 
                    />

                    <div className='column-center-center w-100'>

                        <h1 className='font-middle font-semibold mt-20 mb-20 w-100'>
                            I piatti che ami, a <b className='color-primary font-bold'>domicilio</b>.
                        </h1>

                        <Location setLoader={setLoader} />
                        <Link onClick={() => setLoader(true)} className='button-primary' href='./prenota/calendario'>Prenota un tavolo</Link>
                        <Link onClick={() => setLoader(true)} className='button-outline' href='./ordina'>Oppure ordina takeaway</Link>
                        
                    </div>

                </section>
            </main>      
        </div>
    );
}


    /*  -----------------------------------------------------------------------------------------------

        PROFILO UTENTE
        -Pagina profilo (dentro info e pulsante di logout)
        -Tutte le prenotazioni passate

        AUTENTICAZIONE
        -Tradurre login e registrazione in italiano
        -Modificare aspetto delle form

        ECOMMERCE (NO POST ACQUISTO)
        -Richiamare i prodotti ciclando tutte le categorie (così da riordinare la query)
        -Menù di tutte le categorie, al click scroll fino alla categoria
        -Stile singolo prodotto
        -Prodotti aggiuntivi nella pagina prodotto e nel carrello (bevande dolci)

        GENERALI
        -Aggiungere loader al click del menù
        
    --------------------------------------------------------------------------------------------------- */