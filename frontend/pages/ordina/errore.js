import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Header from "../../components/header/Header";
import Seo from "../../components/seo/Seo";
import Loader from "../../components/loader/Loader";

import homeImage from '../../assets/images/error-food.svg';

export default function Errore() {

    const [ loader, setLoader ] = useState(false);

    return (
        <div className='column-center-center w-100 h-100'>

            <Seo 
                title='Errore ordine | RistorApp'
                description='...Qualcosa è andato storto, riprovare a ordinare più tardi'
            />

            <Header />

            { loader && <Loader /> }

            <main className='w-100 p-20'>
                    <section className='column-center-center h-100 pos-rel'>
                        
                        <Image
                            width={300}
                            height={300}
                            src={homeImage} 
                            alt='Ordina a casa tua' 
                        />

                        <h1 className="font-big font-semibold">...Qualcosa è andato <b className="color-primary">storto</b></h1>
                        <h2 className="font-small mb-40">Stiamo lavorando per risolvere il problema</h2>

                        <Link onClick={() => setLoader(true)} className='button-primary' href='/prenota/calendario'>Riprova a prenotare</Link>

                    </section>
            </main>
        </div>
    );
}