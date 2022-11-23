import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0' 
import { table } from '../utils/Airtable';

import Seo from '../components/seo/Seo';
import FormReservation from '../components/form/FormReservation';
import { useEffect } from "react";

//TODO FORM DI PRENOTAZIONE
/*
    -Login system
    -Richiamare dati prenotazione indispensabili (no dati utente, no date passate)
    -UX della form
    -UI della form
*/

export async function getStaticProps() {

    const results = await table.select({
        view: "ViewGrid",
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

export default function Prenota({data}) {

    const route = useRouter(); 
    const { user } = useUser();

    useEffect(() => {
        if(!user) {
            route.push('/api/auth/login'); 
        }
    });

    if(user) {
        return (

            <div className={`container-fluid p-0`}>
            
                <Seo 
                    title='Prenota | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                <button onClick={() => route.push("/api/auth/logout")}>ESCI</button>
            
                <main className={`container-fluid`}>
                    <div className={`row`}>
                        <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                            <div className={`container`}>
                                <FormReservation atReservation={data} user={user}/>                             
                            </div>
                        </section>
                    </div>
                </main>
            </div>         
        );
    }
}



    
