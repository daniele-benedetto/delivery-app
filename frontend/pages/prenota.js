import Seo from '../components/seo/Seo';
import FormReservation from '../components/form/FormReservation';
import { table } from '../utils/Airtable';

//TODO FORM DI PRENOTAZIONE
/*
    -Dinamicizzare dati locale
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
                            <FormReservation atReservation={data} />                                     
                        </div>
                    </section>
                </div>
            </main>
        </div>
        
    );
}
