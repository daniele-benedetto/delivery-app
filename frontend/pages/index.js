import Image from "next/image";
import Link from "next/link";

import Seo from '../components/seo/Seo';

import homeImage from '../assets/images/order-food.svg';
import Header from "../components/header/Header";

export default function Home() {
    return (
        <div className='column-center-center w-100 h-100'>

            <Seo 
                title='Home | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <Header />

            <main className='w-100 p-20 mt-80'>

                <section className='column-center-center'>

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

                        <Link className='button-primary' href='./prenota/calendario'>Ordina online</Link>
                        <Link className='button-outline' href='./prenota/calendario'>Prenota un tavolo</Link>
                        
                    </div>

                </section>
            </main>      
        </div>
    );
}


    /*  -----------------------------------------------------------------------------------------------
      
        TODO

        -Stile del calendario
        -Stile del'orario
        -Stile Option
        -Stile colore icone
        -Tabella riassuntiva
        -Pagina profilo con prenotazione al posto di pagina feedback
        -Creare qr code associato alla prenotazione
        -Pagina profilo con tutte le prontazioni
        -Loading
        -Eliminare errori in console

    --------------------------------------------------------------------------------------------------- */