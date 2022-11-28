import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import Header from "../../../components/header/Header";
import Seo from "../../../components/seo/Seo";
import Loader from "../../../components/loader/Loader";

import homeImage from '../../../assets/images/sad-food.svg';

export default function Cancellazione() {

    const [loader, setLoader] = useState(false);


        return (
            <div className='column-center-center w-100 h-100'>
    
                <Seo 
                    title='Cancellazione prenotazione | RistorApp'
                    description='La cancellazione della prenotazione è avvenuta con successo'
                />
    
                <Header />
    
                { loader && <Loader /> }
    
                <main className='w-100 p-20'>
                        <section className='column-center-center h-100 pos-rel'>
                            <Image
                                width={250}
                                height={250}
                                src={homeImage} 
                                alt='Ordina a casa tua' 
                            />
    
                            <h1 className="font-big font-semibold">Ci dispiace non vederti <b className="color-primary">arrivare</b></h1>
                            <h2 className="font-small mb-40">La cancellazione della prenotazione è avvenuta con successo</h2>
    
                            <Link onClick={() => setLoader(true)} className='button-primary' href='/'>Torna in Home</Link>
    
                        </section>
                </main>
            </div>
        );
    }
