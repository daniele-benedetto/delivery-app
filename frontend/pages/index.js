import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Seo from '../components/seo/Seo';
import Header from "../components/header/Header";

import homeImage from '../assets/images/order-food.svg';
import Loader from "../components/loader/Loader";

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

                        <h1 className='font-big font-semibold'>
                            I tuoi piatti preferiti<br />con <b className='color-primary font-bold'>RistoApp</b>
                        </h1>

                        <h2 className='font-small mb-40'>
                            Consegna a domicilio, ordina take away e sistema di prenotazione del tavolo
                        </h2>

                        <Link onClick={() => setLoader(true)} className='button-primary' href='./prenota/calendario'>Ordina online</Link>
                        <Link onClick={() => setLoader(true)} className='button-outline' href='./prenota/calendario'>Prenota un tavolo</Link>
                        
                    </div>

                </section>
            </main>      
        </div>
    );
}


    /*  -----------------------------------------------------------------------------------------------
      
        TODO PER INIZIARE TEST SU FLOW PRENOTAZIONI

        PROFILO UTENTE
        -Pagina profilo (dentro info e pulsante di logout)

        AUTENTICAZIONE
        -Tradurre login e registrazione in italiano
        
    --------------------------------------------------------------------------------------------------- */