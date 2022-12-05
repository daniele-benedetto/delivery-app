import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import Header from "../../../../components/header/Header";
import Seo from "../../../../components/seo/Seo";
import Loader from "../../../../components/loader/Loader";

import { table } from "../../../../utils/Airtable";

import homeImage from '../../../../assets/images/thanks-food.svg';

//Genera i path sulla base dei record
export async function getStaticPaths() {
    const results = await table.select({
        view: "ViewGrid",
        fields: ['date', 'time', 'reservation', 'meal', 'place', 'sub'],
    }).all();

    const paths = results.map(({ id }) => ({
        params: {
          id: id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    }
}

//Richiamo il record e genero i campi
export async function getStaticProps({ params: {id}}) {

    const results = await table.select({
        view: "ViewGrid",
        fields: ['id', 'date', 'time', 'reservation', 'meal', 'place'],
        filterByFormula: `{id} = '${id}'`
    }).all();

    const data = {
        props: {
              data: results.map(result => {
                return {
                    id: result.id,
                    ...result.fields,
                }
            })
        }
    }
    
    return data;
}

export default function Successo({ data }) {

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        updateReservation(data[0].id);
    });

    const updateReservation = async (id) => {
        try {
            const res = await fetch("/api/airtable/upDateReservation", {
                method: "PUT",
                body: JSON.stringify( {id} ),
                headers: { "Content-Type": "application/json" },
            });
            await res.json();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='column-center-center w-100 h-100'>
    
            <Seo 
                title='Successo prenotazione | RistorApp'
                description='La prenotazione si è conclusa con successo'
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
    
                        <h1 className="font-big font-semibold">Grazie per aver mangiato da <b className="color-primary">noi</b></h1>
                        <h2 className="font-small mb-40">Speriamo di porterti rivedere al più presto</h2>

                        <Link onClick={() => setLoader(true)} className='button-primary' href='/'>Torna in Home</Link>
    
                    </section>
            </main>
        </div>
    );
}